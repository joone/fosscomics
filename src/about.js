const fm = require("front-matter");
const fs = require("fs");

const common = require("./mod/common");
const config = require("./mod/config");
const marked = require("./mod/marked");

const posthtml = (post) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../styles/fonts.css">
        <link rel="stylesheet" href="../styles/main.css">
        <link rel="icon" type="image/png" href="../images/favicon.png">
        <!-- Google tag (gtag.js) -->
        ${config.googleAnalyticsID ? common.googleAnalytics(config.googleAnalyticsID) : ""}
        <title>${config.blogName}: ${post.attributes.title}</title>
        <meta name="description" content="${config.blogDescription}" />
        ${common.openGraph(
          "website",
          config.blogName,
          `${config.blogsite}/about.html`,
          `${config.blogName}: ${post.attributes.title}`,
          config.blogDescription,
          config.image,
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="${config.blogsite}" />
        <meta name="twitter:title" content="${config.blogName}: ${post.attributes.title}" />
        <meta name="twitter:description" content="${config.blogDescription}" />
        <meta name="twitter:image" content="${post.attributes.image}" />
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">
                  ${config.blogName}
                </div>
                <nav class="site-navigation">
                  <a href="/">Home</a>
                  <a href="/all_posts">All posts</a>
                  About
                  <a href="/tags">Tags</a>
                </nav>
            </header>
            <main>
              <article class="content">
                  <div class="title">
                    <h1 class="title">${post.attributes.title}</h1>
                  </div>
                  <section class="body">
                    ${post.body}
                  </section>
              </article>
            </main>

            <footer>
              ${common.footer()}
            </footer>
        </div>
    </body>
</html>
`;

const readAbout = () => {
  const aboutPath = config.dev.about;
  const post = fs.readFileSync(aboutPath, "utf8");
  const content = fm(post);
  content.body = marked.parse(content.body);
  content.path = aboutPath;
  return content;
};

const createAboutPage = () => {
  const about = readAbout();
  if (!fs.existsSync(`${config.dev.outdir}/about/`))
    fs.mkdirSync(`${config.dev.outdir}/about/`);
  fs.writeFile(
    `${config.dev.outdir}/about/index.html`,
    posthtml(about),
    (e) => {
      if (e) throw e;
      console.log(`${about.path}/about/index.html was created successfully`);
    },
  );
};

module.exports = {
  createAboutPage: createAboutPage,
};
