// Create reference instance
import { marked } from "marked";

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  },
  image(href, title, text) {
    let titleAttribute = title != "null" ? `title="${title}" ` : "";
    return `
      <div style="text-align: center;">
        <img src="${href}" alt="${text}" ${titleAttribute}/>
      </div>`;
  },
};

marked.use({ renderer });

// Run marked
///console.log(marked.parse('# heading+'));
console.log(marked.parse('![alt_text](images/image13.png "image_tooltip")'));
