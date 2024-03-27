const config = require("./config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

const posthtml = data => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../assets/styles/fonts.css">
        <link rel="stylesheet" href="../assets/styles/main.css">
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M0CWE9F5HJ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M0CWE9F5HJ');
        </script>
        <title>${data.attributes.title}</title>
        <meta name="description" content="${data.attributes.description}" />
        <meta property="article:author" content="${config.authorName}" />
        <meta property="article:published_time" content="${data.attributes.date}" />
        <meta property="article:tag" content="${data.attributes.tags}" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="${config.blogsite}/${data.path}/" />
        <meta property="og:title" content="${data.attributes.title}" />
        <meta property="og:description" content="${data.attributes.description}" />
        <meta property="og:image" content="${config.blogsite}/${data.path}/images/${data.attributes.image}" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="${config.twitter}" />
        <meta name="twitter:title" content="${data.attributes.title}" />
        <meta name="twitter:description" content="${data.attributes.description}" />
        <meta name="twitter:image" content="${config.blogsite}/${data.path}/images/${data.attributes.image}" />
    </head>
    <body>
        <div class="content">
            <header>
                <div class="main">
                  <a href="..">F/OSS Comics</a>
                </div>
                <nav class="site-navigation">
                  <a href="/">Home</a>
                  <a href="/posts.html">All posts</a>
                  <a href="/about.html">About</a>
                  <a href="/tags">Tags</a>
                </nav>
            </header>
            <main>
              <article>
                  <div class="title">
                    <h1 class="title">${data.attributes.title}</h1>
                    <div class="meta">Posted on ${new Date(data.attributes.date).toDateString()}</div>
                  </div>
                  <section class="body">
                    ${data.body}
                  </section>
                  <div class="post-tags">
                    <nav class="nav tags">
                      <ul class="tags">
                        ${data.attributes.tags.map(tag => `<li><a href="/tags/${tag.replace(/\s+/g, "_")}">${tag}</a></li>`).join("")}
                      </ul>
                    </nav>
                  </div>
              </article>
              <nav role="navigation" class="post-navigation">
			          <h1 class="assistive-text">Post navigation</h1>
                ${data.previous ? `<div class="nav-previous"><a href="../${data.previous.path}"><span class="meta-nav">←</span>${data.previous.attributes.title}</a></div>` : ""}
                ${data.next ? `<div class="nav-next"><a href="../${data.next.path}">${data.next.attributes.title}<span class="meta-nav">→</span></a></div>` : ""}
              </nav>
              <div class="comments border">
                <script src="https://utteranc.es/client.js"
                            repo="joone/fosscomics"
                            issue-term="pathname"
                            theme="github-light"
                            crossorigin="anonymous"
                            async>
                </script>
              </div>
            </main>

            <footer>
              <div style="display:flex">
                <a class="soc" href="https://github.com/joone/fosscomics" rel="me" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                <a class="border"></a><a class="soc" href="https://twitter.com/fosscomics/" rel="me" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a class="border"></a>
              </div>
              <div class="footer-info">
                ${`© ${new Date().getFullYear()} ${
                  config.authorName
                } |  <a href="/">Home</a> | Built with <a href="https://github.com/joone/fosscomics">fosscomics</a>`}
              </div>
            </footer>
        </div>
    </body>
</html>
`;

const renderArticle = postPath => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}/index.md`, "utf8");
  const content = fm(data);

  // Override function
  const renderer = {
    image(href, title, text) {
      let size = null;
      // Check if the title contains a size specification
      if (title && title.includes('size:')) {
        const sizeMatch = title.match(/size:(\d+%)/);
        if (sizeMatch && sizeMatch[1]) {
            size = sizeMatch[1];
            // Remove the size specification from the title
            title = title.replace(/size:\d+%/g, '').trim();
        }
      }

      // Construct the image tag with optional size and title
      let imageTag = `<img src="${href}" alt="${text}"`;
      if (size) {
          imageTag += ` style="width: ${size};"`;
      }
      imageTag += '>';

      return `
        <div style="text-align: center;">
          <figure style="text-align: center;">
            ${imageTag}
            ${title ? `<figcaption>${title}</figcaption>` : ""}
          </figure>
        </div>
      `;
    },
    link(href, title, text) {
      let align = null;
      if (title && title.includes('align:')) {
        // align: left, right, center
        const alignMatch = title.match(/align:(left|right|center)/);
        if (alignMatch && alignMatch[1]) {
          align = alignMatch[1];
          // Remove the alignment specification from the title
          title = title.replace(/align:(left|right|center)/g, '').trim();
        }
      }
      // if align is not null, add div with text-align style
      if (align) {
        return `
          <div style="text-align: ${align};">
            <a href="${href} "${title ? `title="${title}"` : ""}>${text}</a>
          </div>`;
      } else {
        return `<a href="${href} "${title ? `title="${title}"` : ""}>${text}</a>`;
      }
    }
  };

  marked.use({ renderer });
  content.body = marked.parse(content.body);
  content.path = postPath;
  const tagArray = content.attributes.tags.split(",");
  const trimedTagArray = tagArray.map((tag) => tag.trim());
  content.attributes.tags = trimedTagArray;

  return content;
};

function renderArticles() {
  const posts = [];
  const postPaths = fs.readdirSync(config.dev.postsdir);
  postPaths.forEach(postPath => {
    const post = renderArticle(postPath);
    post.path = postPath;
    posts.push(post);
  });
  // sort by date
  posts.sort(function(a, b) {
    return new Date(b.attributes.date) - new Date(a.attributes.date);
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

const createPosts = posts => {
  posts.forEach(post => {
    if (fs.existsSync(`${config.dev.outdir}/${post.path}`))
      fs.rmdirSync(`${config.dev.outdir}/${post.path}`, { recursive: true });

    fs.mkdirSync(`${config.dev.outdir}/${post.path}`);

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      e => {
        if (e) throw e;
        console.log(`${post.path}/index.html was created successfully`);
      }
    );

    // Copy images folder from ${config.dev.postsdir}/${postPath} to ${config.dev.outdir}/${postPath}
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}/images`))
      fs.mkdirSync(`${config.dev.outdir}/${post.path}/images`);

    fs.readdirSync(`${config.dev.postsdir}/${post.path}/images`).forEach(image => {
      fs.copyFileSync(
        `${config.dev.postsdir}/${post.path}/images/${image}`,
        `${config.dev.outdir}/${post.path}/images/${image}`
      );
    });
  });
};

module.exports = {
  renderArticles: renderArticles,
  createPosts: createPosts
};
