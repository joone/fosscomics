const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");
const tagPage = require("./tag");

const tagListPage = (tags, pageTitle) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="../styles/fonts.css">
        <link rel="stylesheet" href="../styles/main.css">
        <link rel="icon" type="image/png" href="../images/favicon.png">

        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}: ${pageTitle}</title>
        ${common.openGraph(
          "website",
          config.blogName,
          `${config.blogsite}/tag_list.html`,
          `${config.blogName}: ${pageTitle}`,
          config.blogDescription,
          config.image,
        )}
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
                <nav>
                  <a href="/">Home</a>
                  <a href="/all_posts">All posts</a>
                  <a href="/about">About</a>
                  Tags
                </nav>
            </header>
              <h1 class="page-title">${pageTitle}</h1>
              <div class="tag-cloud">
              <ul class="tags">
                ${tags
                  .map(
                    (tag) => `<li class="post">
                    <a href="${tag.path}">${tag.name}</a>
                    </li>`,
                  )
                  .join("")}
              </ul>
              </div>
            <footer>
              ${common.footer()}
            </footer>
        </div>
    </body>
</html>
`;

function gatherTags(posts) {
  const tags = new Map(); // Changed to a Map
  posts.forEach((post) => {
    // const tagArray = post.attributes.tags.split(",");
    post.attributes.tags.forEach((tag) => {
      if (!tags.has(tag)) {
        tags.set(tag, []); // Initialize an empty array for new tags
      }
      tags.get(tag).push({
        path: post.path,
        title: post.attributes.title,
        date: post.attributes.date,
        description: post.attributes.description,
      });
    });
  });

  // Convert Map to desired output
  return tags;
}

function createTagPages(articles) {
  //tagArray = Array.from(tags.keys());

  const tagMap = gatherTags(articles);

  let tagArray = [];
  for (let [tag, posts] of tagMap) {
    console.log(tag, posts);
    tagArray.push({ name: tag, path: tag.replace(/\s+/g, "_") });
  }

  tagArray.sort((a, b) => a.name.localeCompare(b.name));

  if (!fs.existsSync(`${config.dev.outdir}/tags/`))
    fs.mkdirSync(`${config.dev.outdir}/tags/`);
  fs.writeFile(
    `${config.dev.outdir}/tags/index.html`,
    tagListPage(tagArray, "All tags"),
    (e) => {
      if (e) throw e;
      console.log(`tags/index.html for tags was created successfully`);
    },
  );

  for (let [tag, posts] of tagMap) {
    tagPage.createTagPage(tag, posts);
  }
}

module.exports = {
  createTagPages: createTagPages,
};
