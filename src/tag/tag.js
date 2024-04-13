const fs = require("fs");
const PageBase = require("../mod/page_base");

module.exports = class TagPage extends PageBase {
  createPages(tag, posts) {
    let tagPath = tag.replace(/\s+/g, "_"); // Replace spaces with underscores
    if (!fs.existsSync(`${this.config.dev.outdir}/tags/${tagPath}`))
      fs.mkdirSync(`${this.config.dev.outdir}/tags/${tagPath}`);

    const data = { tag: tag, posts: posts, url: "tags/" + tagPath };
    (this.url = `${this.config.blogsite}/${data.url}`),
      (this.title = `${this.config.blogName}: Entries tagged - ${data.tag}`);
    this.description = `${this.config.description}`;
    fs.writeFile(
      `${this.config.dev.outdir}/tags/${tagPath}/index.html`,
      this.generateHTML("./themes/archie/layouts/tag.html", data),
      (e) => {
        if (e) throw e;
        console.log(`/tags/${tagPath}/index.html was created successfully`);
      },
    );
  }
};
