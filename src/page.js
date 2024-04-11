const fm = require("front-matter");
const fs = require("fs");
const marked = require("./mod/marked");

module.exports = class Page {
  constructor(theme, config) {
    this.title = "";
    this.image = "";
    this.theme = theme;
    this.srcFilePath = "";
    this.config = config;
    this.contentBody = "";
    this.markdownFilePath = ""; // markdown file path
    this.contentPath = config.dev.content; // ./content/
  }

  readSource(filePath) {
    this.srcFilePath = filePath;
    const mdContent = fs.readFileSync(
      `${this.config.dev.content}/${filePath}`,
      "utf8",
    );
    // parsed content by fields and body
    const content = fm(mdContent);

    this.title = content.attributes.title;
    this.date = content.attributes.date;
    this.image = content.attributes.image;

    if (content.attributes.tags && content.attributes.tags.length > 0) {
      const tagArray = content.attributes.tags.split(",");
      this.tags = tagArray
        .map((tag) => tag.trim())
        .sort((a, b) => a.localeCompare(b));
    }

    // generated HTML from markdown
    this.body = marked.parse(content.body);

    // for generating the navigation link in the post.html template
    this.next = null;
    this.previous = null;
  }

  // about/index.html or about/hello.html
  generateOutput(templateFile, outputPath) {
    // if file name is not included in the path
    if (outputPath.indexOf(".htm") === -1) {
      if (outputPath[outputPath.length - 1] !== "/") outputPath += "/";
      outputPath += "index.html";
    }

    // if a directory path is included in the path
    if (outputPath.indexOf("/") !== -1) {
      this.path = outputPath.split("/").slice(0, -1).join("/");

      if (fs.existsSync(`${this.config.dev.outdir}/${this.path}`))
        fs.rmdirSync(`${this.config.dev.outdir}/${this.path}`, {
          recursive: true,
        });

      fs.mkdirSync(`${this.config.dev.outdir}/${this.path}`);
    } else {
      // remove the outputPath file if it exists
      if (fs.existsSync(`${this.config.dev.outdir}/${this.path}`))
        fs.unlinkSync(`${this.config.dev.outdir}/${this.path}`);
    }

    const layoutsPath = `${this.config.dev.themePath}/${this.theme}/layouts`;
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

    fs.writeFile(`${this.config.dev.outdir}/${outputPath}`, postHTML, (e) => {
      if (e) throw e;
      console.log(`${outputPath}/index.html was created successfully`);
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
