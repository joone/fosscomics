const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

const tagPage = (tag, posts, url) => {
  const pageTemplate = fs.readFileSync(
    "./themes/archie/layouts/tag.html",
    "utf-8",
  );

  const jsString = "return () => " + `\`${pageTemplate}\`;`;
  const funcPage = new Function("tag, posts, url, config, common", jsString);
  const result = funcPage(tag, posts, url, config, common)();
  const array = result.split("\n");
  for (let i = 0; i < array.length; i++) {
    if (i !== 0) array[i] = `${array[i]}`;
  }

  return array.join("\n");
};

function createTagPage(tag, posts) {
  let tagPath = tag.replace(/\s+/g, "_"); // Replace spaces with underscores
  if (!fs.existsSync(`${config.dev.outdir}/tags/${tagPath}`))
    fs.mkdirSync(`${config.dev.outdir}/tags/${tagPath}`);
  fs.writeFile(
    `${config.dev.outdir}/tags/${tagPath}/index.html`,
    tagPage(tag, posts, "tags/" + tagPath),
    (e) => {
      if (e) throw e;
      console.log(`/tags/${tagPath}/index.html was created successfully`);
    },
  );
}

module.exports = {
  createTagPage: createTagPage,
};
