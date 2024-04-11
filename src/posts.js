const fm = require("front-matter");
const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");
const marked = require("./mod/marked");
class Post {
  constructor(config) {
    this.config = config;
    this.theme = config.theme;
    this.srcFilePath = "";
  }

  readSource(filePath) {
    this.srcFilePath = filePath;
    const mdContent = fs.readFileSync(
      `${config.dev.postsdir}/${filePath}`,
      "utf8",
    );
    // parsed content by fields and body
    const content = fm(mdContent);

    this.title = content.attributes.title;
    this.date = content.attributes.date;
    this.image = content.attributes.image;
    const tagArray = content.attributes.tags.split(",");
    this.tags = tagArray
      .map((tag) => tag.trim())
      .sort((a, b) => a.localeCompare(b));

    this.description = content.attributes.description;
    this.body = marked.parse(content.body);
    // remove <p></p> and <p> </p> from the beginning and end of the content.body
    this.body = this.body.replace(/<p><\/p>/g, "").replace(/<p> <\/p>/g, "");

    this.next = null;
    this.previous = null;

    // For a seriese of posts
    // this.path is used to create a navigation link in the post.html template
    if (filePath.indexOf("/") !== -1)
      this.path = filePath.split("/").slice(0, -1).join("/");
  }

  // FOr a series of posts
  generateOutput(templateFile) {
    const outputPath = `${this.path}/index.html`;
    this.generateOutputPath(templateFile, outputPath);
  }

  generateOutputPath(templateFile, outputPath) {
    // if a directory path is included in the path
    if (outputPath.indexOf("/") !== -1) {
      // get a directory path from the outputPath
      if (this.page === "")
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
    const funcPost = new Function("page, common", jsString);
    const result = funcPost(this, common)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `${array[i]}`;
    }

    const postHTML = array.join("\n");

    fs.writeFileSync(
      `${this.config.dev.outdir}/${outputPath}`,
      postHTML,
      (e) => {
        if (e) throw e;
        console.log(`${outputPath} was created successfully`);
      },
    );

    // if there is the images foler in the output directory.
    if (this.path !== "") {
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
}

// Read all markdown articles from content/posts and sort them by date
function renderArticles() {
  const posts = [];
  // config.dev.postsdir: ./content/posts",
  const postPaths = fs.readdirSync(config.dev.postsdir);
  postPaths.forEach((postPath) => {
    const post = new Post(config);
    const path = `${postPath}/index.md`;
    post.readSource(path);
    posts.push(post);
  });
  // sort by date
  posts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // loop through posts and add previous and next post to each post
  for (let i = 0; i < posts.length; i++) {
    if (i > 0) {
      posts[i].next = posts[i - 1];
    }
    if (i < posts.length - 1) {
      posts[i].previous = posts[i + 1];
    }
  }

  return posts;
}

module.exports = {
  renderArticles: renderArticles,
};
