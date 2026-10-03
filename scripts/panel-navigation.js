window.FossbookPanelNavigation = (() => {
  const edgePadding = 16;

  function targetScrollTop(documentTop, panelHeight, viewportHeight, maxScroll) {
    const top =
      panelHeight > viewportHeight - edgePadding * 2
        ? documentTop - edgePadding
        : documentTop + panelHeight / 2 - viewportHeight / 2;
    return Math.max(0, Math.min(top, maxScroll));
  }

  function init() {
    const panels = [...document.querySelectorAll(".comic-panel")];
    if (!panels.length) return;

    document.addEventListener("keydown", (event) => {
      if (
        !["PageDown", "PageUp"].includes(event.key) ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        document.querySelector("dialog[open]") ||
        event.target.closest?.(
          'input, textarea, select, button, [contenteditable="true"]',
        )
      ) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const positions = panels
        .filter((panel) => panel.getClientRects().length)
        .map((panel) => {
          const bounds = panel.getBoundingClientRect();
          return targetScrollTop(
            bounds.top + window.scrollY,
            bounds.height,
            viewportHeight,
            maxScroll,
          );
        })
        .sort((left, right) => left - right)
        .filter(
          (position, index, values) =>
            index === 0 || Math.abs(position - values[index - 1]) > 8,
        );

      const tolerance = 8;
      const destination =
        event.key === "PageDown"
          ? positions.find((position) => position > window.scrollY + tolerance)
          : [...positions]
              .reverse()
              .find((position) => position < window.scrollY - tolerance);
      if (destination === undefined) return;

      event.preventDefault();
      window.scrollTo({
        top: destination,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  return { init, targetScrollTop };
})();
