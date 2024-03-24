const fs = require("fs");

const postMethods = require("./posts");
const aboutMethod = require("./about");
const config = require("./config");
const addHomePage = require("./homepage");
const addListPage = require("./list");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => postMethods.readArticle(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);

addHomePage(posts);
addListPage(posts);

// Create about page
const about = aboutMethod.readAbout(config.dev.about);
aboutMethod.createAbout(about);