const fs = require("fs");

const about = require("./about");
const config = require("./config");
const home = require("./home");
const list = require("./list");
const posts = require("./posts");
const tagList = require("./tag_list");

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
const postArray  = posts.createPostPages();

home.createPagenation(postArray);
list.createAllPostsPage(postArray);
tagList.createTagPages(postArray);
about.createAboutPage(config.dev.about);

