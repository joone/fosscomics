const assert = require("assert");
const fs = require("fs");

const Page = require("../src/page");

describe("Test", function () {
  before(() => {
    const path = "test/output";
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  });

  beforeEach(function () {});

  afterEach(function () {});

  after(function () {
    // delete test/output directory
    //fs.rmSync("test/output", { recursive: true });
  });

  describe("Page class", function () {
    it("generate a page", function (done) {
      this.timeout(5000);
      const theme = {
        name: "archie",
        layoutsPath: "layouts",
      };
      const config = {
        authorName: "Foo Bar",
        version: "0.0.1",
        siteTwitter: "@fosscomics",
        githubRespository: "https://github/joone/fosscomics",
        date_time: "2021-01-01",
        blogName: "My blog",
        theme: "archie",
        dev: {
          themePath: "test/themes",
          outdir: "test/output",
          content: "test/docs",
        },
      };
      const page = new Page(config);
      page.readSource("test.md");
      page.generateOutputPath("page.html", "about");

      // check if the file exists
      const output = fs.readFileSync("test/output/about/index.html", "utf8");
      assert.equal(true, output.length > 0);
      const baseline = fs.readFileSync("test/page_baseline.html", "utf8");
      assert.equal(baseline, output);

      done();
    });
  });
});
