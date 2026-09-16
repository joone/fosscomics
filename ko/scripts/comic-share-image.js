/* global htmlToImage */
window.FossbookShareImage = (() => {
  const text = (comment, url) =>
    [comment.trim(), url].filter(Boolean).join("\n\n");
  const artworkSelector = "img, picture, svg, figcaption, .mermaid";

  function artworkOnly(root) {
    for (const node of [...root.childNodes]) {
      if (node.nodeType !== 1) {
        node.remove();
      } else if (
        node.matches(".image-dialogue, .comic-share-trigger, script, style")
      ) {
        node.remove();
      } else if (!node.matches(artworkSelector)) {
        artworkOnly(node);
        if (!node.querySelector(artworkSelector)) node.remove();
      }
    }
    return Boolean(root.querySelector("img, picture, svg, .mermaid"));
  }

  function bodyText(root) {
    const read = (node) => {
      if (node.nodeType === 3) return node.textContent || "";
      if (node.nodeType !== 1) return "";
      if (
        node.matches(artworkSelector + ", .comic-share-trigger, script, style")
      )
        return "";
      if (node.tagName === "BR") return "\n";
      const value = [...node.childNodes].map(read).join("");
      return /^(P|DIV|SECTION|BLOCKQUOTE|LI|UL|OL|PRE|H[1-6]|TR)$/.test(
        node.tagName,
      )
        ? value.trim() + "\n\n"
        : value;
    };
    return read(root)
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  const namespaceCloneIds = (root, prefix) => {
    const replacements = new Map();
    root.querySelectorAll("[id]").forEach((element) => {
      const originalId = element.id;
      replacements.set(originalId, prefix + originalId);
      element.id = prefix + originalId;
    });
    root.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        let value = attribute.value;
        replacements.forEach((namespacedId, originalId) => {
          value = value
            .split("url(#" + originalId + ")")
            .join("url(#" + namespacedId + ")");
          if (value === "#" + originalId) value = "#" + namespacedId;
        });
        if (attribute.name.startsWith("aria-")) {
          value = value
            .split(" ")
            .map((id) => replacements.get(id) || id)
            .join(" ");
        }
        if (value !== attribute.value)
          element.setAttribute(attribute.name, value);
      });
    });
  };
  const readDataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });

  async function render(preview, filename) {
    const capture = preview.cloneNode(true);
    capture.classList.add("comic-share-capture");
    capture.setAttribute("aria-hidden", "true");
    namespaceCloneIds(capture, `capture-${Date.now()}-`);
    const originalImages = [...preview.querySelectorAll("img")];
    capture.querySelectorAll("source").forEach((source) => source.remove());
    preview.closest("dialog").appendChild(capture);
    try {
      await document.fonts.ready;
      if (capture.querySelector(".mermaid:not([data-processed])")) {
        throw new Error(
          "Wait for the diagram to finish rendering, then reopen sharing.",
        );
      }
      // Fail explicitly rather than letting the renderer replace failed assets
      // with blank images. Use only the displayed publication image.
      await Promise.all(
        [...capture.querySelectorAll("img")].map(async (image, index) => {
          const source = originalImages[index];
          const response = await fetch(source.currentSrc || source.src);
          if (!response.ok)
            throw new Error(`Image request failed (${response.status})`);
          image.removeAttribute("srcset");
          image.removeAttribute("sizes");
          image.removeAttribute("loading");
          image.src = await readDataUrl(await response.blob());
          await image.decode();
        }),
      );
      const width = Math.ceil(capture.getBoundingClientRect().width);
      const height = Math.ceil(capture.scrollHeight);
      if (!width || !height || height > 8192) {
        throw new Error("This panel is too large to export as one image.");
      }
      const blob = await htmlToImage.toBlob(capture, {
        width,
        height,
        pixelRatio: Math.min(2, 8192 / height),
        backgroundColor: "#ffffff",
        style: { position: "static", left: "auto", top: "auto", margin: "0" },
      });
      if (!blob || blob.size === 0)
        throw new Error("The image renderer returned an empty image.");
      return new File([blob], filename, { type: "image/png" });
    } finally {
      capture.remove();
    }
  }

  return {
    render,
    namespaceCloneIds,
    artworkOnly,
    bodyText,
    text,
    nativeData: (file, comment, url) => ({
      files: [file],
      text: text(comment, url),
    }),
    xUrl: (comment, url) =>
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(comment.trim()) +
      "&url=" +
      encodeURIComponent(url),
    facebookUrl: (url) =>
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
  };
})();
