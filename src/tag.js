const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");

const tagPage = (tag, posts, url) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="../../styles/fonts.css">
        <link rel="stylesheet" href="../../styles/main.css">
        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}: Entries tagged - ${tag}</title>
        ${common.openGraph(
          "website",
          config.blogName,
          `${config.blogsite}/${url}`,
          `${config.blogName}: Entries tagged - ${tag}`,
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
                  <a href="/tags">Tags</a>
                </nav>
            </header>
              <h1 class="page-title">Entries tagged - "${tag}"</h1>
              <ul class="posts">

                ${posts
                  .map(
                    (post) => `<li class="post">
                    <a href="/${post.path}">${post.title}</a><span class="meta">
                        ${new Date(post.date).toDateString()}</span>
                    </li>`,
                  )
                  .join("")}
              </ul>
            <footer>
              ${common.footer()}
            </footer>
        </div>
    </body>
</html>
`;

function createTagPage(tag, posts) {
  let tagPath = tag.replace(/\s+/g, "_"); // Replace spaces with underscores
  if (!fs.existsSync(`${config.dev.outdir}/tags/${tagPath}`))
    fs.mkdirSync(`${config.dev.outdir}/tags/${tagPath}`);
  fs.writeFile(
    `${config.dev.outdir}/tags/${tagPath}/index.html`,
    tagPage(tag, posts, "tags/" + tagPath),
    (e) => {
      if (e) throw e;
      console.log(`/tags/${tagPath}/index.html was created successfully`);
    },
  );
}

module.exports = {
  createTagPage: createTagPage,
};
