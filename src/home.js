const fs = require("fs");

const createPagenation = (posts, pageBase) => {
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);

  if (fs.existsSync(`${pageBase.config.dev.outdir}/page`))
    fs.rmdirSync(`${pageBase.config.dev.outdir}/page`, { recursive: true });

  fs.mkdirSync(`${pageBase.config.dev.outdir}/page`);

  // copy content/page/1.html to docs/page/1.html
  if (fs.existsSync(`${pageBase.config.dev.content}/page/1.html`))
    fs.copyFileSync(
      `${pageBase.config.dev.content}/page/1.html`,
      `${pageBase.config.dev.outdir}/page/1.html`,
    );

  for (let i = 0; i < numPages; i++) {
    const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage);

    let filePath;
    let url;
    if (i === 0) {
      filePath = `${pageBase.config.dev.outdir}/index.html`;
      url = pageBase.config.blogsite;
    } else {
      filePath = `${pageBase.config.dev.outdir}/page/${i + 1}.html`;
      url = `${pageBase.config.blogsite}/page/${i + 1}.html`;
    }
    const prev = i - 1 >= 0 ? i : null;
    const next = i + 1 < numPages ? i + 2 : null;

    console.log("prev", prev, "next", next);
    pageBase.url = url;
    pageBase.title = `${pageBase.config.blogName}`;
    const data = { posts: pagePosts, prev: prev, next: next };
    fs.writeFile(
      `${filePath}`,
      pageBase.generateHTML("./themes/archie/layouts/home.html", data),
      (e) => {
        if (e) throw e;
        console.log(`page/${i + 1}.html was created successfully`);
      },
    );
  }
};

module.exports = {
  createPagenation: createPagenation,
};
