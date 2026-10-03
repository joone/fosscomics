window.FossbookEpisodeShare = (() => {
  const pageMetadata = () => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const title = document.querySelector('meta[property="og:title"]');
    const description = document.querySelector(
      'meta[property="og:description"]',
    );
    return {
      url: canonical ? canonical.href : window.location.href.split("#")[0],
      title: title?.content || document.title,
      text: description?.content || "",
    };
  };

  const composedText = ({ title, url }) => [title, url].filter(Boolean).join("\n\n");
  const facebookUrl = ({ url }) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const threadsUrl = (metadata) =>
    `https://www.threads.net/intent/post?text=${encodeURIComponent(composedText(metadata))}`;
  const blueskyUrl = (metadata) =>
    `https://bsky.app/intent/compose?text=${encodeURIComponent(composedText(metadata))}`;
  const xUrl = ({ title, url }) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  function init({
    copiedLabel = "Link copied",
    copyErrorLabel = "Could not copy link",
    shareErrorLabel = "Could not share this episode",
  } = {}) {
    const wrapper = document.querySelector(".episode-share");
    if (!wrapper) return;

    const trigger = wrapper.querySelector(".episode-share-trigger");
    const menu = wrapper.querySelector(".episode-share-menu");
    const status = wrapper.querySelector(".episode-share-status");
    const nativeButton = wrapper.querySelector(".episode-share-native");
    const metadata = pageMetadata();
    const items = [...menu.querySelectorAll('[role="menuitem"]')];

    wrapper.querySelector(".episode-share-facebook").href =
      facebookUrl(metadata);
    wrapper.querySelector(".episode-share-threads").href = threadsUrl(metadata);
    wrapper.querySelector(".episode-share-bluesky").href = blueskyUrl(metadata);
    wrapper.querySelector(".episode-share-x").href = xUrl(metadata);
    nativeButton.hidden = typeof navigator.share !== "function";

    const closeMenu = (restoreFocus = false) => {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (restoreFocus) trigger.focus();
    };
    const openMenu = (focusFirst = false) => {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      if (focusFirst) items.find((item) => !item.hidden)?.focus();
    };

    trigger.addEventListener("click", () => {
      if (menu.hidden) openMenu();
      else closeMenu();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      openMenu(event.key === "ArrowDown");
      if (event.key === "ArrowUp") {
        const visibleItems = items.filter((item) => !item.hidden);
        visibleItems[visibleItems.length - 1]?.focus();
      }
    });
    menu.addEventListener("keydown", (event) => {
      const visibleItems = items.filter((item) => !item.hidden);
      const current = visibleItems.indexOf(document.activeElement);
      let next = null;
      if (event.key === "ArrowDown") next = (current + 1) % visibleItems.length;
      if (event.key === "ArrowUp")
        next = (current - 1 + visibleItems.length) % visibleItems.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = visibleItems.length - 1;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (next === null) return;
      event.preventDefault();
      visibleItems[next].focus();
    });
    document.addEventListener("pointerdown", (event) => {
      if (!menu.hidden && !wrapper.contains(event.target)) closeMenu();
    });
    wrapper.addEventListener("focusout", (event) => {
      if (!wrapper.contains(event.relatedTarget)) closeMenu();
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    wrapper
      .querySelector(".episode-share-copy")
      .addEventListener("click", async () => {
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(metadata.url);
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = metadata.url;
            textArea.setAttribute("readonly", "");
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            const copied = document.execCommand("copy");
            textArea.remove();
            if (!copied) throw new Error("Copy command failed");
          }
          status.textContent = copiedLabel;
        } catch (error) {
          console.error("Episode link copy failed", error);
          status.textContent = copyErrorLabel;
        }
        closeMenu(true);
      });

    nativeButton.addEventListener("click", async () => {
      closeMenu();
      try {
        await navigator.share(metadata);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Episode sharing failed", error);
        status.textContent = shareErrorLabel;
      }
    });
  }

  return {
    init,
    pageMetadata,
    facebookUrl,
    threadsUrl,
    blueskyUrl,
    xUrl,
  };
})();
