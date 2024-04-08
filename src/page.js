const fm = require("front-matter");
const fs = require("fs");
const marked = require("./mod/marked");

module.exports = class Page {
  constructor(theme, config) {
    this.title = "";
    this.theme = theme;
    this.config = config;
    this.contentBody = "";
    this.markdownFilePath = ""; // markdown file path
  }

  readSource(path) {
    const mdContent = fs.readFileSync(path, "utf8");
    // parsed content by fields and body
    const content = fm(mdContent);
    this.title = content.attributes.title;
    this.contentBody = marked.parse(content.body);
    this.markdownFilePath = path;
  }

  // about/index.html or about/hello.html
  generateOutput(templateFile, outputPath) {
    let path = `${this.config.dev.outdir}/${outputPath}`;
    let file = "";
    // if file name is not included in the path
    if (path.indexOf(".htm") === -1) {
      if (!fs.existsSync(path)) fs.mkdirSync(path);
      if (path[path.length - 1] !== "/") path += "/";
      path += "index.html";
    }

    // read the template file
    const postTemplate = fs.readFileSync(
      `${this.theme.layoutsPath}/page.html`,
      "utf-8",
    );

    const data = { title: this.title, conteht: this.contentBody };

    const jsString = "return () => " + `\`${postTemplate}\`;`;
    const funcPost = new Function("data, config, page", jsString);
    const result = funcPost(data, this.config, this)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `${array[i]}`;
    }

    const postHTML = array.join("\n");

    fs.writeFile(outputPath, postHTML, (e) => {
      if (e) throw e;
      console.log(`${path} was created successfully`);
    });
  }

  footer() {
    const footerTemplate = fs.readFileSync(
      "./themes/archie/layouts/partials/footer.html",
      "utf-8",
    );

    const jsString = "return () => " + `\`${footerTemplate}\`;`;
    const funcFooter = new Function("config", jsString);
    const result = funcFooter(this.config)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `              ${array[i]}`;
    }

    return array.join("\n");
  }
};
