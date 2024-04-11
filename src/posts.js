const fs = require("fs");

const config = require("./mod/config");
const Page = require("./page");

// Read all markdown articles from content/posts and sort them by date
function renderArticles() {
  const posts = [];
  // config.dev.postsdir: ./content/posts",
  const postPaths = fs.readdirSync(config.dev.postsdir);
  postPaths.forEach((postPath) => {
    const post = new Page(config);
    // e.g.: postPath = '1. history of linux'
    post.readSource(`${config.dev.postsdir}/${postPath}`);
    posts.push(post);
  });
  // sort by date
  posts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // loop through posts and add previous and next post to each post
  for (let i = 0; i < posts.length; i++) {
    if (i > 0) {
      posts[i].next = posts[i - 1];
    }
    if (i < posts.length - 1) {
      posts[i].previous = posts[i + 1];
    }
  }

  return posts;
}

module.exports = {
  renderArticles: renderArticles,
};
