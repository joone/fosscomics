// Create reference instance
import { marked } from "marked";

// Override function
const renderer = {
  image(href, title, text) {
    let size = null;

    // Check if the title contains a size specification
    if (title && title.includes("size:")) {
      const sizeMatch = title.match(/size:(\d+%)/);
      if (sizeMatch && sizeMatch[1]) {
        size = sizeMatch[1];
        // Remove the size specification from the title
        title = title.replace(/size:\d+%/g, "").trim();
      }
    }

    // Construct the image tag with optional size and title
    let imageTag = `<img src="${href}" alt="${text}"`;
    if (size) {
      imageTag += ` style="width: ${size};"`;
    }
    imageTag += ">";

    return `
    <div style="text-align: center;">
       <figure style="text-align: center;">
         ${imageTag}
         ${title ? `<figcaption>${title}</figcaption>` : ""}
       </figure>
     </div>
`;
  },
};

marked.use({ renderer });

// Run marked
console.log(
  marked.parse(
    '![Figures of John Mauchly](images/image3.png "John Mauchly size:100%")',
  ),
);

console.log(
  marked.parse('![Figures of John Mauchly](images/image3.png "John Mauchly")'),
);

console.log(marked.parse("![Figures of John Mauchly](images/image3.png)"));
