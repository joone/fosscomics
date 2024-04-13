const fs = require("fs");

module.exports = class PageBase {
  constructor(config) {
    this.config = config;
    this.title = "";
    this.date = "";
    this.tags = [];
    this.content = "";
    this.url = "";
  }

  formatDate(date) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options); // For US English format
  }

  googleAnalytics(trackingId) {
    return `<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${trackingId}");
        </script>`;
  }

  // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
  twitterCard(card) {
    return `<meta name="twitter:card" content="${card}" />
        <meta name="twitter:site" content="${this.config.siteTwitter}" />
        <meta name="twitter:creator" content="${this.config.authorTwitter}" />
        <meta name="twitter:title" content="${this.title}" />
        <meta name="twitter:description" content="${this.config.blogDescription}" />
        <meta name="twitter:image" content="${this.config.image}" />`;
  }

  // https://ogp.me/
  openGraph(type, articleObj) {
    const result = `<meta property="og:type" content="${type}" />
        <meta property="og:site_name" content="${this.config.blogName}" />
        <meta property="og:url" content="${this.url}" />
        <meta property="og:title" content="${this.title}" />
        <meta property="og:description" content="${this.config.blogDescription}" />
        <meta property="og:image" content="${this.config.image}" />`;

    if (type === "article" && articleObj) {
      return (
        result +
        `
          <meta property="article:author" content="${articleObj.authorName}" />
          <meta property="article:published_time" content="${articleObj.publishedDate}" />
          ${articleObj.tags.map((tag) => `<meta property="article:tag" content="${tag}">`).join("\n        ")}`
      );
    }
    return result;
  }

  footer() {
    const footerTemplate = fs.readFileSync(
      "./themes/archie/layouts/partials/footer.html",
      "utf-8",
    );

    const jsString = "return () => " + `\`${footerTemplate}\`;`;
    const funcFooter = new Function("config", jsString);
    const result = funcFooter(this.config)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `              ${array[i]}`;
    }

    return array.join("\n");
  }

  generateHTML(templatePath, data) {
    const postTemplate = fs.readFileSync(templatePath, "utf-8");

    const jsString = "return () => " + `\`${postTemplate}\`;`;
    const funcPost = new Function("page, data", jsString);
    const result = funcPost(this, data)();
    const array = result.split("\n");
    for (let i = 0; i < array.length; i++) {
      if (i !== 0) array[i] = `${array[i]}`;
    }

    const postHTML = array.join("\n");
    return postHTML;
  }
};
