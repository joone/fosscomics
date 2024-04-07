const fm = require("front-matter");
const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");
const marked = require("./mod/marked");

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

  const data = { post: about };
  fs.writeFile(
    `${config.dev.outdir}/about/index.html`,
    common.generateHTML("./themes/archie/layouts/page.html", data),
    (e) => {
      if (e) throw e;
      console.log(`${about.path}/about/index.html was created successfully`);
    },
  );
};

module.exports = {
  createAboutPage: createAboutPage,
};
