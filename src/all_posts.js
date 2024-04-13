const fs = require("fs");

const createAllPostsPage = (posts, pageBase) => {
  const pageTitle = "All posts";
  if (!fs.existsSync(`${pageBase.config.dev.outdir}/all_posts/`))
    fs.mkdirSync(`${pageBase.config.dev.outdir}/all_posts/`);

  const data = { posts: posts, pageTitle: pageTitle };
  pageBase.url = `${pageBase.config.blogsite}/posts.html`;
  pageBase.title = `${pageBase.config.blogName}: ${data.pageTitle}`;
  pageBase.description = "All posts";
  fs.writeFile(
    `${pageBase.config.dev.outdir}/all_posts/index.html`,
    pageBase.generateHTML("./themes/archie/layouts/all_posts.html", data),
    (e) => {
      if (e) throw e;
      console.log(`posts.html was created successfully`);
    },
  );
};

module.exports = {
  createAllPostsPage: createAllPostsPage,
};
