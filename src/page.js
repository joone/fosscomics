const fm = require("front-matter");
const fs = require("fs");
const path = require("path");
const marked = require("./mod/marked");
const PageBase = require("./mod/page_base");

module.exports = class Page extends PageBase {
  constructor(config) {
    super(config);
    this.theme = config.theme;
    this.srcFilePath = "";
    this.markdownFilePath = ""; // markdown file path
    this.contentPath = config.dev.content; // ./content/
  }

  readSource(filePath) {
    if (filePath.indexOf(".md") === -1)
      this.srcFilePath = filePath + "/index.md";
    else this.srcFilePath = filePath;

    const mdContent = fs.readFileSync(this.srcFilePath, "utf8");

    if (path.extname(filePath) === ".md") {
      // If the file has a .md extension, extract the file name without the extension
      this.path = path.basename(filePath, ".md");
    } else {
      // If there's no .md extension, just get the last part of the path
      this.path = path.basename(filePath);
    }
    // parsed content by fields and body
    const content = fm(mdContent);

    this.title = `${content.attributes.title}`;
    this.date = content.attributes.date;
    this.url = `${this.config.blogsite}/${this.path}/`;
    this.image = content.attributes.image;
    this.description = content.attributes.description;
    // default image if no imageURL is specified
    this.imageURL = this.config.image;

    if (content.attributes.tags && content.attributes.tags.length > 0) {
      const tagArray = content.attributes.tags.split(",");
      this.tags = tagArray
        .map((tag) => tag.trim())
        .sort((a, b) => a.localeCompare(b));
    }

    // this.description = content.attributes.description;
    // generated HTML from markdown
    this.body = marked.parse(content.body);
    // remove <p></p> and <p> </p> from the beginning and end of the content.body
    this.body = this.body.replace(/<p><\/p>/g, "").replace(/<p> <\/p>/g, "");

    // for generating the navigation link in the post.html template
    this.next = null;
    this.previous = null;
  }

  // For a series of posts
  generateOutput(templateFile) {
    const outputPath = `${this.path}/index.html`;
    this.generateOutputPath(templateFile, outputPath);
  }

  // about/index.html or about/hello.html
  generateOutputPath(templateFile, outputPath) {
    // if file name is not included in the path
    if (outputPath.indexOf(".htm") === -1) {
      if (outputPath[outputPath.length - 1] !== "/") outputPath += "/";
      outputPath += "index.html";
    }

    // if a directory path is included in the path
    if (outputPath.indexOf("/") !== -1) {
      if (this.path === "")
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

    const funcPost = new Function("page", `return () => \`${postTemplate}\`;`);
    const result = funcPost(this)();
    const postHTML = result
      .split("\n")
      .map((line, index) => (index !== 0 ? `${line}` : line))
      .join("\n");

    fs.writeFileSync(
      `${this.config.dev.outdir}/${outputPath}`,
      postHTML,
      (e) => {
        if (e) throw e;
        console.log(`${outputPath}/index.html was created successfully`);
      },
    );

    // if there is the images foler in the output directory.
    if (
      fs.existsSync(`${this.config.dev.postsdir}/${this.path}/images`) &&
      this.path !== ""
    ) {
      // Copy images folder from ${this.config.dev.postsdir}/${postPath} to ${this.config.dev.outdir}/${postPath}
      if (!fs.existsSync(`${this.config.dev.outdir}/${this.path}/images`))
        fs.mkdirSync(`${this.config.dev.outdir}/${this.path}/images`);

      fs.readdirSync(`${this.config.dev.postsdir}/${this.path}/images`).forEach(
        (image) => {
          fs.copyFileSync(
            `${this.config.dev.postsdir}/${this.path}/images/${image}`,
            `${this.config.dev.outdir}/${this.path}/images/${image}`,
          );
        },
      );
    }
  }
};
