const fs = require("fs");

const postMethods = require("./posts");
const aboutMethod = require("./about");
const config = require("./config");
const createHomePage = require("./home");
const createAllPostsPage = require("./list");
const createTagPage = require("./tag");
const createTagListPage = require("./tag_list");

// Read all markdown articles from content/posts and sort them by date
const posts = postMethods.readArticles();

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// Create posts in docs/posts
postMethods.createPosts(posts);

createHomePage(posts);
//createPagenation(posts);
createAllPostsPage(posts);

const tagMap = createTagListPage(posts);

for (let [tag, posts] of tagMap) {
  console.log(tag, posts);
  createTagPage(tag, posts);
}

// Create about page
const about = aboutMethod.readAbout(config.dev.about);
aboutMethod.createAbout(about);

