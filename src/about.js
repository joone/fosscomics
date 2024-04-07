const fm = require("front-matter");
const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");
const marked = require("./mod/marked");

const posthtml = (post) => {
  const postTemplate = fs.readFileSync(
    "./themes/archie/layouts/page.html",
    "utf-8",
  );

  const jsString = "return () => " + `\`${postTemplate}\`;`;
  const funcPost = new Function("post, config, common", jsString);
  const result = funcPost(post, config, common)();
  const array = result.split("\n");
  for (let i = 0; i < array.length; i++) {
    if (i !== 0) array[i] = `${array[i]}`;
  }

  const postHTML = array.join("\n");
  return postHTML;
};

const readAbout = () => {
  const aboutPath = config.dev.about;
  const post = fs.readFileSync(aboutPath, "utf8");
  const content = fm(post);
  content.body = marked.parse(content.body);
  content.path = aboutPath;
  return content;
};

const createAboutPage = () => {
  const about = readAbout();
  if (!fs.existsSync(`${config.dev.outdir}/about/`))
    fs.mkdirSync(`${config.dev.outdir}/about/`);
  fs.writeFile(
    `${config.dev.outdir}/about/index.html`,
    posthtml(about),
    (e) => {
      if (e) throw e;
      console.log(`${about.path}/about/index.html was created successfully`);
    },
  );
};

module.exports = {
  createAboutPage: createAboutPage,
};
