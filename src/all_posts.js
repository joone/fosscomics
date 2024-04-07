const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

const createAllPostsPage = (posts) => {
  const pageTitle = "All posts";
  if (!fs.existsSync(`${config.dev.outdir}/all_posts/`))
    fs.mkdirSync(`${config.dev.outdir}/all_posts/`);

  const data = { posts: posts, pageTitle: pageTitle };
  fs.writeFile(
    `${config.dev.outdir}/all_posts/index.html`,
    common.generateHTML("./themes/archie/layouts/all_posts.html", data),
    (e) => {
      if (e) throw e;
      console.log(`posts.html was created successfully`);
    },
  );
};

module.exports = {
  createAllPostsPage: createAllPostsPage,
};
