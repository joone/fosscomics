const fs = require("fs");

const posts = require("./posts");
const about = require("./about");
const config = require("./config");
const home = require("./home");
const list = require("./list");
const tag = require("./tag_list");


if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
const articles  = posts.createPostPages();

home.createPagenation(articles);
list.createAllPostsPage(articles);
tag.createTagPages(articles);

// Create about page
about.createAboutPage(config.dev.about);

