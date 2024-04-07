const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

function createTagPage(tag, posts) {
  let tagPath = tag.replace(/\s+/g, "_"); // Replace spaces with underscores
  if (!fs.existsSync(`${config.dev.outdir}/tags/${tagPath}`))
    fs.mkdirSync(`${config.dev.outdir}/tags/${tagPath}`);

  const data = { tag: tag, posts: posts, url: "tags/" + tagPath };
  fs.writeFile(
    `${config.dev.outdir}/tags/${tagPath}/index.html`,
    common.generateHTML("./themes/archie/layouts/tag.html", data),
    (e) => {
      if (e) throw e;
      console.log(`/tags/${tagPath}/index.html was created successfully`);
    },
  );
}

module.exports = {
  createTagPage: createTagPage,
};
