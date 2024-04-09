const fm = require("front-matter");
const fs = require("fs");
const marked = require("./mod/marked");

module.exports = class Page {
  constructor(theme, config) {
    this.title = "";
    this.image = "";
    this.theme = theme;
    this.config = config;
    this.contentBody = "";
    this.markdownFilePath = ""; // markdown file path
    this.contentPath = config.dev.content; // ./content/
  }

  readSource(path) {
    this.markdownFilePath = `${this.contentPath}/${path}`;
    const mdContent = fs.readFileSync(`${this.markdownFilePath}`, "utf8");
    // parsed content by fields and body
    const content = fm(mdContent);
    this.title = content.attributes.title;
    this.image = content.attributes.image;
    this.contentBody = marked.parse(content.body);
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

    const layoutsPath = `${this.config.dev.themePath}/${this.theme}/layouts`;
    // read the template file
    const postTemplate = fs.readFileSync(
      `${layoutsPath}/${templateFile}`,
      "utf-8",
    );

    const jsString = "return () => " + `\`${postTemplate}\`;`;
    const funcPost = new Function("page", jsString);
    const result = funcPost(this)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `${array[i]}`;
    }

    const postHTML = array.join("\n");

    fs.writeFileSync(path, postHTML, (e) => {
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

  // https://ogp.me/
  openGraph(type, siteName, url, title, description, image, articleObj) {
    const result = `<meta property="og:type" content="${type}" />
        <meta property="og:site_name" content="${siteName}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />`;

    if (type === "article" && articleObj) {
      return (
        result +
        `
          <meta property="article:author" content="${articleObj.authorName}" />
          <meta property="article:published_time" content="${articleObj.publishedDate}" />
          ${articleObj.tags.map((tag) => `<meta property="article:tag" content="${tag}">`).join("\n        ")}`
      );
    }
    return result;
  }

  googleAnalytics(trackingId) {
    return `<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${trackingId}");
        </script>`;
  }
};
