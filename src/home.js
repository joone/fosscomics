const fs = require("fs");
const PageBase = require("./mod/page_base");

module.exports = class Pagenation extends PageBase {
  constructor(config) {
    super(config);
  }

  createPages(posts) {
    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);

    if (fs.existsSync(`${this.config.dev.outdir}/page`))
      fs.rmdirSync(`${this.config.dev.outdir}/page`, { recursive: true });

    fs.mkdirSync(`${this.config.dev.outdir}/page`);

    // copy content/page/1.html to docs/page/1.html
    if (fs.existsSync(`${this.config.dev.content}/page/1.html`))
      fs.copyFileSync(
        `${this.config.dev.content}/page/1.html`,
        `${this.config.dev.outdir}/page/1.html`,
      );

    for (let i = 0; i < numPages; i++) {
      const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage);

      let filePath;
      let url;
      if (i === 0) {
        filePath = `${this.config.dev.outdir}/index.html`;
        url = this.config.blogsite;
      } else {
        filePath = `${this.config.dev.outdir}/page/${i + 1}.html`;
        url = `${this.config.blogsite}/page/${i + 1}.html`;
      }
      const prev = i - 1 >= 0 ? i : null;
      const next = i + 1 < numPages ? i + 2 : null;

      console.log("prev", prev, "next", next);
      this.url = url;
      this.title = `${this.config.blogName}`;
      this.imageURL = this.config.image;
      const data = { posts: pagePosts, prev: prev, next: next };
      fs.writeFile(
        `${filePath}`,
        this.generateHTML("./themes/archie/layouts/home.html", data),
        (e) => {
          if (e) throw e;
          console.log(`page/${i + 1}.html was created successfully`);
        },
      );
    }
  }
};
