const assert = require("assert");
const Page = require("../src/page");

describe("Test", function () {
  before(async function () {});

  beforeEach(function () {});

  afterEach(function () {});

  after(function () {});

  describe("Page class", function () {
    it("generate a page", function (done) {
      const theme = { layoutsPath: "test/docs/theme" };
      const config = {
        blogName: "My blog",
        dev: {
          outdir: "test/output",
          content: "test/docs",
        },
      };
      const page = new Page(theme, config);
      page.readSource("test/docs/test.md");
      page.generateOutput("page.html", "test/output/index.html");

      assert.equal(true, true);

      done();
    });
  });
});
