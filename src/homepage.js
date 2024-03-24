const config = require("./config");
const fs = require("fs");

const homepage = posts => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <link rel="stylesheet" href="./assets/styles/fonts.css">
        <link rel="stylesheet" href="./assets/styles/main.css">
        <title>${config.blogName}</title>
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">${config.blogName}</div>
            </header>

            <main class="list">
            <div class="site-description">
              <p>Comis about Free and Open Source Software</p>
            </div>

                ${posts
                  .map(
                    post => `<section class="list-item">
                    <h1><a href="./${post.path}">${
                      post.attributes.title
                    }</a></h1>
                        <small>${new Date(
                          parseInt(post.attributes.date)
                        ).toDateString()}</small>
                      <p>${post.attributes.description}</p>
                    </section>`
                  )
                  .join("")}
            </main>

            <footer>
              ${`<p>© ${new Date().getFullYear()} ${
                config.authorName
              }, <a href="https://fosscomics.com">fosscomics.com</a></p>`}
            </footer>
        </div>
    </body>
</html>
`;

const addHomePage = posts => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), e => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

module.exports = addHomePage;
