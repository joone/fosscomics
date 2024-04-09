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
    fs.rmSync("test/output", { recursive: true });
  });

  describe("Page class", function () {
    it("generate a page", function (done) {
      this.timeout(5000);
      const theme = {
        name: "archie",
        layoutsPath: "layouts",
      };
      const config = {
        blogName: "My blog",
        theme: "archie",
        dev: {
          themePath: "test/themes",
          outdir: "test/output",
          content: "test/docs",
        },
      };
      const page = new Page(theme, config);
      page.readSource("test/docs/test.md");
      page.generateOutput("page.html", "test/output/index.html");

      // check if the file exists
      const output = fs.readFileSync("test/output/index.html", "utf8");
      console.log("length", output.length);
      assert.equal(true, output.length > 0);

      done();
    });
  });
});
