const fs = require("fs");

const config = require("./mod/config");
const Page = require("./mod/page");

module.exports = class Posts {
  constructor(config) {
    this.config = config;
    this.posts = [];
  }

  // Read all markdown articles from content/posts and sort them by date
  readSourceList() {
    // config.dev.postsdir: ./content/posts",
    const postPaths = fs.readdirSync(this.config.dev.postsdir);
    postPaths.forEach((postPath) => {
      const post = new Page(config);
      // e.g.: postPath = '1. history of linux'
      post.readSource(`${this.config.dev.postsdir}/${postPath}`);
      post.url = `${this.config.blogsite}/${post.path}/`;
      post.imageURL = `${this.config.blogsite}/${post.path}/images/${post.image}`;
      this.posts.push(post);
    });
    // sort by date
    this.posts.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    // loop through posts and add previous and next post to each post
    for (let i = 0; i < this.posts.length; i++) {
      if (i > 0) {
        this.posts[i].next = this.posts[i - 1];
      }
      if (i < this.posts.length - 1) {
        this.posts[i].previous = this.posts[i + 1];
      }
    }

    return this.posts;
  }

  createPages() {
    this.posts.forEach((post) => {
      post.generateContent("post.html");
    });
  }
};
