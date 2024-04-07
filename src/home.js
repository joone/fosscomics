const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

const createHomePage = (posts) => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), (e) => {
    if (e) throw e;
    console.log(`index.html for home was created successfully`);
  });
};

const createPagenation = (posts) => {
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);

  if (fs.existsSync(`${config.dev.outdir}/page`))
    fs.rmdirSync(`${config.dev.outdir}/page`, { recursive: true });

  fs.mkdirSync(`${config.dev.outdir}/page`);

  // copy content/page/1.html to docs/page/1.html
  if (fs.existsSync(`${config.dev.content}/page/1.html`))
    fs.copyFileSync(
      `${config.dev.content}/page/1.html`,
      `${config.dev.outdir}/page/1.html`,
    );

  for (let i = 0; i < numPages; i++) {
    const pagePosts = posts.slice(i * postsPerPage, (i + 1) * postsPerPage);

    let filePath;
    if (i === 0) {
      filePath = `${config.dev.outdir}/index.html`;
    } else {
      filePath = `${config.dev.outdir}/page/${i + 1}.html`;
    }
    const prev = i - 1 >= 0 ? i : null;
    const next = i + 1 < numPages ? i + 2 : null;

    console.log("prev", prev, "next", next);
    const data = { posts: pagePosts, prev: prev, next: next };
    fs.writeFile(
      `${filePath}`,
      common.generateHTML("./themes/archie/layouts/home.html", data),
      (e) => {
        if (e) throw e;
        console.log(`page/${i + 1}.html was created successfully`);
      },
    );
  }
};

module.exports = {
  createHomePage: createHomePage,
  createPagenation: createPagenation,
};
