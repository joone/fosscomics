const fs = require("fs");

const posts = require("./posts");
const about = require("./about");
const config = require("./config");
const home = require("./home");
const list = require("./list");
const tag = require("./tag_list");


if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
const postArray  = posts.createPostPages();

home.createPagenation(postArray);
list.createAllPostsPage(postArray);
tag.createTagPages(postArray);

// Create about page
about.createAboutPage(config.dev.about);

