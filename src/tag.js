const fs = require("fs");

function createTagPage(tag, posts, pageBase) {
  let tagPath = tag.replace(/\s+/g, "_"); // Replace spaces with underscores
  if (!fs.existsSync(`${pageBase.config.dev.outdir}/tags/${tagPath}`))
    fs.mkdirSync(`${pageBase.config.dev.outdir}/tags/${tagPath}`);

  const data = { tag: tag, posts: posts, url: "tags/" + tagPath };
  (pageBase.url = `${pageBase.config.blogsite}/${data.url}`),
    (pageBase.title = `${pageBase.config.blogName}: Entries tagged - ${data.tag}`);
  pageBase.description = `${pageBase.config.description}`;
  fs.writeFile(
    `${pageBase.config.dev.outdir}/tags/${tagPath}/index.html`,
    pageBase.generateHTML("./themes/archie/layouts/tag.html", data),
    (e) => {
      if (e) throw e;
      console.log(`/tags/${tagPath}/index.html was created successfully`);
    },
  );
}

module.exports = {
  createTagPage: createTagPage,
};
