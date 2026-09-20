/* global htmlToImage, html2canvas */
window.FossbookShareImage = (() => {
  const labelSets = {
    en: {
      heading: "Share this block",
      menu: "Share",
      socialShare: "Social sharing...",
      comment: "Comment",
      commentPlaceholder: "Add your comment (optional)",
      close: "Close",
      shareOnX: "Share on X",
      shareOnBluesky: "Share on Bluesky",
      popupBlocked: "Pop-up blocked. Allow pop-ups to continue.",
      imagePreparing: "Preparing panel image...",
      imageError:
        "Could not create the panel image. Check image access and try reopening sharing.",
      imageHelp:
        'Click "Copy panel image" and paste it into your post on a social site.',
      downloadImage: "Download panel image",
      copyImage: "Copy panel image",
      shareImage: "Share image via device",
      copyComment: "Copy comment and link",
      includeText: "Include comic text in image",
      bodyText: "Comic text",
      noArtwork:
        "This panel has no artwork. Include comic text to create an image.",
      imageCopied: "Image copied. Paste it into your post.",
      imageDownloaded: "Image downloaded. Attach it to your post.",
      commentCopied:
        "Comment and link copied. Paste them into your post.",
      actionError:
        "Sharing or copying failed. Download the image or copy the comment manually.",
      attachImage:
        "Attach the downloaded or copied panel image yourself; it is not attached automatically.",
    },
    ko: {
      heading: "이 장면 공유",
      menu: "공유",
      socialShare: "소셜 공유…",
      comment: "의견",
      commentPlaceholder: "의견을 덧붙여 공유하세요 (선택)",
      close: "닫기",
      shareOnX: "X에 공유",
      shareOnBluesky: "Bluesky에 공유",
      popupBlocked:
        "팝업이 차단되었습니다. 계속하려면 팝업을 허용하세요.",
      imagePreparing: "장면 이미지를 만드는 중입니다.",
      imageError:
        "장면 이미지를 만들지 못했습니다. 이미지 접근 상태를 확인하고 공유 창을 다시 여세요.",
      imageHelp:
        '"장면 이미지 복사"를 누르고 소셜 사이트의 게시물에 붙여넣으세요.',
      downloadImage: "장면 이미지 저장",
      copyImage: "장면 이미지 복사",
      shareImage: "이미지 공유",
      copyComment: "의견과 링크 복사",
      includeText: "본문을 이미지에 포함",
      bodyText: "만화 본문",
      noArtwork:
        "이 장면에는 그림이 없습니다. 본문을 포함하여 이미지를 만드세요.",
      imageCopied: "이미지를 복사했습니다. 게시물에 붙여넣으세요.",
      imageDownloaded: "이미지를 저장했습니다. 게시물에 첨부하세요.",
      commentCopied:
        "의견과 링크를 복사했습니다. 게시물에 붙여넣으세요.",
      actionError:
        "공유 또는 복사에 실패했습니다. 이미지를 저장하거나 의견을 직접 복사하세요.",
      attachImage:
        "저장하거나 복사한 장면 이미지를 직접 첨부하세요. 자동 첨부되지 않습니다.",
    },
  };
  const labels = (language) =>
    labelSets[String(language || "en").toLowerCase().split("-")[0]] ||
    labelSets.en;
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

  function rendererScript() {
    const agent = navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(agent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const safari = /AppleWebKit/.test(agent) &&
      !/Chrome|Chromium|Edg\/|OPR\/|Android/.test(agent);
    return iOS || safari ? "html2canvas.js" : "html-to-image.js";
  }

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
      const pixelRatio = Math.min(2, 8192 / height);
      const style = { position: "static", left: "auto", top: "auto", margin: "0" };
      let blob;
      if (rendererScript() === "html2canvas.js") {
        // WebKit can omit raster images inside SVG foreignObject snapshots.
        const canvas = await html2canvas(capture, {
          width,
          height,
          scale: pixelRatio,
          backgroundColor: "#ffffff",
          foreignObjectRendering: false,
          allowTaint: false,
          useCORS: true,
          onclone: (document, element) => Object.assign(element.style, style),
        });
        blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      } else {
        blob = await htmlToImage.toBlob(capture, {
          width,
          height,
          pixelRatio,
          backgroundColor: "#ffffff",
          style,
        });
      }
      if (!blob || blob.size === 0)
        throw new Error("The image renderer returned an empty image.");
      return new File([blob], filename, { type: "image/png" });
    } finally {
      capture.remove();
    }
  }

  function init({ locale = "en", labels: overrides = {} } = {}) {
    const FossbookShareImage = window.FossbookShareImage;
    const defaults = labels(locale);
    const shareDefaults = Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [
        key,
        overrides[key] || value,
      ]),
    );

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonicalLink ? canonicalLink.href : window.location.href.split("#")[0];

    const copyText = async (value) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        return;
      }
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      shareDialog.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand("copy");
      textArea.remove();
      if (!copied) throw new Error("Copy command failed");
    };

    const namespaceCloneIds = FossbookShareImage.namespaceCloneIds;

    const openShareUrl = (url) => {
      // noopener on window.open itself returns null even on success.
      const popup = window.open("about:blank", "_blank");
      if (!popup) return false;
      popup.opener = null;
      popup.location.replace(url);
      return true;
    };

    const contextMenu = document.createElement("div");
    contextMenu.className = "comic-share-context-menu";
    contextMenu.hidden = true;
    contextMenu.setAttribute("role", "menu");
    contextMenu.innerHTML =
      '<button class="comic-share-menu-item" type="button" role="menuitem"></button>';
    const contextMenuItem = contextMenu.querySelector(".comic-share-menu-item");
    contextMenuItem.textContent = shareDefaults.socialShare;
    document.body.appendChild(contextMenu);

    const shareDialog = document.createElement("dialog");
    shareDialog.className = "comic-share-dialog";
    shareDialog.innerHTML =
      '<form class="comic-share-dialog-content" method="dialog">' +
        '<div class="comic-share-dialog-header">' +
          '<h2 class="comic-share-heading"></h2>' +
          '<button class="comic-share-close" type="submit" value="close" autofocus></button>' +
        '</div>' +
        '<label class="comic-share-comment-label" for="comic-share-comment"></label>' +
        '<textarea id="comic-share-comment" class="comic-share-comment-input" rows="2"></textarea>' +
        '<label class="comic-share-include-text-label">' +
          '<input class="comic-share-include-text" type="checkbox" checked aria-controls="comic-share-preview-content comic-share-body-text">' +
          '<span></span>' +
        '</label>' +
        '<section class="comic-share-preview" aria-live="polite">' +
          '<p class="comic-share-preview-comment" hidden></p>' +
          '<div class="comic-share-preview-block">' +
            '<div class="comic-share-preview-content"></div>' +
          '</div>' +
          '<p class="comic-share-preview-link"></p>' +
        '</section>' +
        '<div class="comic-share-body" hidden>' +
          '<label for="comic-share-body-text"></label>' +
          '<textarea id="comic-share-body-text" class="comic-share-body-text" rows="4" readonly></textarea>' +
        '</div>' +
        '<p class="comic-share-help"></p>' +
        '<div class="comic-share-buttons">' +
          '<button class="comic-share-button comic-share-native" type="button" hidden disabled></button>' +
          '<button class="comic-share-button comic-share-download" type="button" disabled></button>' +
          '<button class="comic-share-button comic-share-copy-image" type="button" disabled></button>' +
          '<button class="comic-share-button comic-share-copy-comment" type="button"></button>' +
        '</div>' +
        '<div class="comic-share-buttons comic-share-web-buttons">' +
          '<button class="comic-share-button comic-share-x" type="button"></button>' +
          '<button class="comic-share-button comic-share-bluesky" type="button"></button>' +
        '</div>' +
        '<p class="comic-share-status" role="status" aria-live="polite"></p>' +
      '</form>';
    shareDialog.setAttribute("aria-labelledby", "comic-share-heading");
    shareDialog.querySelector(".comic-share-heading").id = "comic-share-heading";
    shareDialog.querySelector(".comic-share-heading").textContent = shareDefaults.heading;
    shareDialog.querySelector(".comic-share-close").textContent = shareDefaults.close;
    shareDialog.querySelector(".comic-share-comment-label").textContent = shareDefaults.comment;
    const commentInput = shareDialog.querySelector(".comic-share-comment-input");
    commentInput.placeholder = shareDefaults.commentPlaceholder;
    const previewComment = shareDialog.querySelector(".comic-share-preview-comment");
    const previewContent = shareDialog.querySelector(".comic-share-preview-content");
    previewContent.id = "comic-share-preview-content";
    const includeTextInput = shareDialog.querySelector(".comic-share-include-text");
    shareDialog.querySelector(".comic-share-include-text-label span").textContent = shareDefaults.includeText;
    const bodyTextPreview = shareDialog.querySelector(".comic-share-body");
    bodyTextPreview.querySelector("label").textContent = shareDefaults.bodyText;
    const bodyTextArea = bodyTextPreview.querySelector("textarea");
    const previewLink = shareDialog.querySelector(".comic-share-preview-link");
    const shareOnXButton = shareDialog.querySelector(".comic-share-x");
    shareOnXButton.textContent = shareDefaults.shareOnX;
    const shareOnBlueskyButton = shareDialog.querySelector(".comic-share-bluesky");
    shareOnBlueskyButton.textContent = shareDefaults.shareOnBluesky;
    const shareStatus = shareDialog.querySelector(".comic-share-status");
    shareDialog.querySelector(".comic-share-help").textContent = shareDefaults.imageHelp;
    const downloadButton = shareDialog.querySelector(".comic-share-download");
    downloadButton.textContent = shareDefaults.downloadImage;
    const copyImageButton = shareDialog.querySelector(".comic-share-copy-image");
    copyImageButton.textContent = shareDefaults.copyImage;
    copyImageButton.hidden = !(navigator.clipboard?.write && window.ClipboardItem);
    const nativeButton = shareDialog.querySelector(".comic-share-native");
    nativeButton.textContent = shareDefaults.shareImage;
    const copyCommentButton = shareDialog.querySelector(".comic-share-copy-comment");
    copyCommentButton.textContent = shareDefaults.copyComment;
    document.body.appendChild(shareDialog);

    let shareFile = null;
    let shareFileUrl = null;
    let renderGeneration = 0;
    let activeBlock = null;
    let contextMenuTrigger = null;
    let dialogTrigger = null;

    const closeContextMenu = (restoreFocus = false) => {
      contextMenu.hidden = true;
      if (contextMenuTrigger) {
        contextMenuTrigger.setAttribute("aria-expanded", "false");
      }
      if (restoreFocus && contextMenuTrigger) contextMenuTrigger.focus();
      contextMenuTrigger = null;
    };

    const openContextMenu = (block, x, y, trigger) => {
      activeBlock = block;
      contextMenuTrigger = trigger;
      trigger.setAttribute("aria-expanded", "true");
      contextMenu.hidden = false;
      contextMenu.style.left = x + "px";
      contextMenu.style.top = y + "px";
      const bounds = contextMenu.getBoundingClientRect();
      contextMenu.style.left = Math.max(8, Math.min(x, window.innerWidth - bounds.width - 8)) + "px";
      contextMenu.style.top = Math.max(8, Math.min(y, window.innerHeight - bounds.height - 8)) + "px";
      contextMenuItem.focus();
    };

    const getSharePreview = () =>
      FossbookShareImage.text(commentInput.value, activeBlock.blockUrl);
    const updateSharePreview = () => {
      const comment = commentInput.value.trim();
      previewComment.textContent = comment;
      previewComment.hidden = !comment;
    };

    const releaseShareImage = () => {
      renderGeneration += 1;
      if (shareFileUrl) URL.revokeObjectURL(shareFileUrl);
      shareFileUrl = null;
      shareFile = null;
      downloadButton.disabled = copyImageButton.disabled = nativeButton.disabled = true;
      nativeButton.hidden = true;
    };

    const prepareShareImage = async () => {
      releaseShareImage();
      const generation = renderGeneration;
      shareStatus.textContent = shareDefaults.imagePreparing;
      const panelPreview = activeBlock.panel.cloneNode(true);
      panelPreview.removeAttribute("id");
      panelPreview.classList.remove("comic-share-target");
      panelPreview.classList.add("comic-share-preview-panel");
      panelPreview.querySelectorAll(".comic-share-trigger").forEach((trigger) => trigger.remove());
      if (document.documentElement.classList.contains("transcripts-hidden")) {
        panelPreview.querySelectorAll(".image-dialogue").forEach((dialogue) => dialogue.remove());
      }
      bodyTextArea.value = FossbookShareImage.bodyText(panelPreview);
      bodyTextPreview.hidden = includeTextInput.checked || !bodyTextArea.value;
      const hasArtwork = includeTextInput.checked || FossbookShareImage.artworkOnly(panelPreview);
      namespaceCloneIds(panelPreview, activeBlock.blockId + "-preview-");
      previewContent.replaceChildren(panelPreview);
      if (!hasArtwork) {
        shareStatus.textContent = shareDefaults.noArtwork;
        return;
      }
      try {
        const file = await FossbookShareImage.render(
          shareDialog.querySelector(".comic-share-preview-block"),
          activeBlock.blockId + ".png",
        );
        if (generation !== renderGeneration) return;
        shareFile = file;
        shareFileUrl = URL.createObjectURL(file);
        downloadButton.disabled = copyImageButton.disabled = false;
        const data = FossbookShareImage.nativeData(file, commentInput.value, activeBlock.blockUrl);
        nativeButton.hidden = !(navigator.share && navigator.canShare?.(data));
        nativeButton.disabled = nativeButton.hidden;
        shareStatus.textContent = shareDefaults.attachImage;
      } catch (error) {
        if (generation !== renderGeneration) return;
        console.error("Panel image export failed", error);
        shareStatus.textContent = shareDefaults.imageError + (error.message ? " " + error.message : "");
      }
    };

    const openShareDialog = () => {
      dialogTrigger = contextMenuTrigger;
      closeContextMenu();
      commentInput.value = "";
      includeTextInput.checked = true;
      previewLink.textContent = activeBlock.blockUrl;
      updateSharePreview();
      shareDialog.showModal();
      prepareShareImage();
    };

    contextMenuItem.addEventListener("click", openShareDialog);
    includeTextInput.addEventListener("change", prepareShareImage);
    contextMenu.addEventListener("focusout", (event) => {
      // Touch browsers can blur before delivering the menu item's click.
      // Outside taps are handled by pointerdown; close here for keyboard focus.
      if (event.relatedTarget && !contextMenu.contains(event.relatedTarget)) closeContextMenu();
    });
    commentInput.addEventListener("input", updateSharePreview);
    document.addEventListener("pointerdown", (event) => {
      if (!contextMenu.hidden && !contextMenu.contains(event.target)) {
        closeContextMenu();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !contextMenu.hidden) {
        event.preventDefault();
        closeContextMenu(true);
      }
    });
    window.addEventListener("resize", () => closeContextMenu());
    shareDialog.addEventListener("click", (event) => {
      if (event.target === shareDialog) shareDialog.close();
    });
    shareDialog.addEventListener("close", () => {
      releaseShareImage();
      if (dialogTrigger) dialogTrigger.focus();
      dialogTrigger = null;
    });

    shareOnXButton.addEventListener("click", () => {
      const url = FossbookShareImage.xUrl(commentInput.value, activeBlock.blockUrl);
      shareStatus.textContent = shareDefaults.attachImage;
      if (!openShareUrl(url)) {
        shareStatus.textContent = shareDefaults.popupBlocked;
      }
    });

    shareOnBlueskyButton.addEventListener("click", () => {
      const url = FossbookShareImage.blueskyUrl(commentInput.value, activeBlock.blockUrl);
      shareStatus.textContent = shareDefaults.attachImage;
      if (!openShareUrl(url)) {
        shareStatus.textContent = shareDefaults.popupBlocked;
      }
    });

    const copyComment = async () => {
      try {
        await copyText(getSharePreview());
        shareStatus.textContent = shareDefaults.commentCopied;
      } catch (error) {
        console.error("Comment copy failed", error);
        shareStatus.textContent = shareDefaults.actionError;
      }
    };
    copyCommentButton.addEventListener("click", copyComment);

    downloadButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = shareFileUrl;
      link.download = shareFile.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      shareStatus.textContent = shareDefaults.imageDownloaded;
    });

    copyImageButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": shareFile })]);
        shareStatus.textContent = shareDefaults.imageCopied;
      } catch (error) {
        console.error("Panel image copy failed", error);
        shareStatus.textContent = shareDefaults.actionError;
      }
    });

    nativeButton.addEventListener("click", async () => {
      try {
        const data = FossbookShareImage.nativeData(shareFile, commentInput.value, activeBlock.blockUrl);
        if (!navigator.canShare(data)) throw new Error("File sharing is unavailable");
        await navigator.share(data);
        shareStatus.textContent = "";
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Panel image sharing failed", error);
        shareStatus.textContent = shareDefaults.actionError;
      }
    });

    document.querySelectorAll(".comic-panel").forEach((panel, index) => {
      if (!panel.id) {
        let suffix = index + 1;
        while (document.getElementById("comic-panel-" + suffix)) suffix += 1;
        panel.id = "comic-panel-" + suffix;
      }
      const blockId = panel.id;
      const block = {
        panel,
        blockId,
        blockUrl: canonicalUrl + "#" + blockId,
      };
      panel.classList.add("comic-share-target");
      const trigger = document.createElement("button");
      trigger.className = "comic-share-trigger";
      trigger.type = "button";
      trigger.textContent = "↗";
      trigger.setAttribute("aria-label", shareDefaults.menu);
      trigger.setAttribute("title", shareDefaults.menu);
      trigger.setAttribute("aria-haspopup", "menu");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", () => {
        const bounds = trigger.getBoundingClientRect();
        openContextMenu(block, bounds.right, bounds.bottom, trigger);
      });
      panel.addEventListener("contextmenu", (event) => {
        if (event.shiftKey || !event.target.closest("img, picture, svg")) return;
        event.preventDefault();
        openContextMenu(block, event.clientX, event.clientY, trigger);
      });
      panel.appendChild(trigger);
    });
  }

  return {
    init,
    rendererScript,
    render,
    labels,
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
    blueskyUrl: (comment, url) =>
      "https://bsky.app/intent/compose?text=" +
      encodeURIComponent(text(comment, url)),
  };
})();
