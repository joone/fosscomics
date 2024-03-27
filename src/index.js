const fs = require("fs");

const posts = require("./posts");
const about = require("./about");
const config = require("./config");
const home = require("./home");
const createAllPostsPage = require("./list");
const createTagPage = require("./tag");
const createTagListPage = require("./tag_list");

// Read all markdown articles from content/posts and sort them by date
const articles = posts.renderArticles();

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
posts.createPosts(articles);

home.createPagenation(articles);
createAllPostsPage(articles);

const tagMap = createTagListPage(articles);

for (let [tag, articles] of tagMap) {
  console.log(tag, articles);
  createTagPage(tag, articles);
}

// Create about page
about.createAbout(config.dev.about);

