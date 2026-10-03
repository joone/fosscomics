window.FossbookPanelNavigation = (() => {
  const edgePadding = 16;
  const positionTolerance = 8;

  function targetScrollTop(documentTop, panelHeight, viewportHeight, maxScroll) {
    const top =
      panelHeight > viewportHeight - edgePadding * 2
        ? documentTop - edgePadding
        : documentTop + panelHeight / 2 - viewportHeight / 2;
    return Math.max(0, Math.min(top, maxScroll));
  }

  function init({
    panelSelector = ".comic-panel",
    heading = "Keyboard shortcuts",
    close = "Close",
    nextPanel = "Next panel",
    previousPanel = "Previous panel",
    previousEpisode = "Previous episode",
    nextEpisode = "Next episode",
    previousList = "Previous episode list",
    nextList = "Next episode list",
    previousSection = "Previous section",
    nextSection = "Next section",
    firstPanel = "First panel",
    lastPanel = "Last panel",
    openSelection = "Open selected episode",
    goBack = "Go back",
    pageTop = "Top of page",
    pageBottom = "Bottom of page",
    showHelp = "Show keyboard shortcuts",
  } = {}) {
    const panels = [...document.querySelectorAll(panelSelector)];
    const activationLinkFor = (panel) =>
      panel
        ?.closest(".list-item")
        ?.querySelector("[data-keyboard-activate]");
    const canActivatePanel = panels.some(activationLinkFor);
    const siteNavigation = document.querySelector(
      ".site-navigation[data-keyboard-current-index]",
    );
    const currentNavigationIndex = Number(
      siteNavigation?.dataset.keyboardCurrentIndex,
    );
    const sectionLink = (offset) =>
      siteNavigation?.querySelector(
        `[data-keyboard-index="${currentNavigationIndex + offset}"]`,
      );
    const previousSectionLink = sectionLink(-1);
    const nextSectionLink = sectionLink(1);
    const previousContentLink = document.querySelector(".page-prev a");
    const nextContentLink = document.querySelector(".page-next a");
    const listNavigation = Boolean(document.querySelector(".pagination"));
    if (
      !panels.length &&
      !previousContentLink &&
      !nextContentLink &&
      !previousSectionLink &&
      !nextSectionLink
    ) {
      return;
    }

    const helpDialog = document.createElement("dialog");
    helpDialog.className = "comic-keyboard-help";
    helpDialog.setAttribute("aria-labelledby", "comic-keyboard-help-heading");
    helpDialog.innerHTML =
      '<form method="dialog" class="comic-keyboard-help-content">' +
        '<h2 id="comic-keyboard-help-heading"></h2>' +
        '<dl>' +
          '<div><dt><kbd>j</kbd> / <kbd>Page Down</kbd></dt><dd class="comic-keyboard-next-panel"></dd></div>' +
          '<div><dt><kbd>k</kbd> / <kbd>Page Up</kbd></dt><dd class="comic-keyboard-previous-panel"></dd></div>' +
          '<div><dt><kbd>h</kbd></dt><dd class="comic-keyboard-previous-episode"></dd></div>' +
          '<div><dt><kbd>l</kbd></dt><dd class="comic-keyboard-next-episode"></dd></div>' +
          '<div><dt><kbd>H</kbd></dt><dd class="comic-keyboard-previous-section"></dd></div>' +
          '<div><dt><kbd>L</kbd></dt><dd class="comic-keyboard-next-section"></dd></div>' +
          '<div><dt><kbd>gg</kbd></dt><dd class="comic-keyboard-first-panel"></dd></div>' +
          '<div><dt><kbd>G</kbd></dt><dd class="comic-keyboard-last-panel"></dd></div>' +
          '<div><dt><kbd>Enter</kbd></dt><dd class="comic-keyboard-open-selection"></dd></div>' +
          '<div><dt><kbd>Backspace</kbd></dt><dd class="comic-keyboard-go-back"></dd></div>' +
          '<div><dt><kbd>Home</kbd></dt><dd class="comic-keyboard-page-top"></dd></div>' +
          '<div><dt><kbd>End</kbd></dt><dd class="comic-keyboard-page-bottom"></dd></div>' +
          '<div><dt><kbd>?</kbd></dt><dd class="comic-keyboard-show-help"></dd></div>' +
        '</dl>' +
        '<button type="submit" value="close" autofocus></button>' +
      '</form>';
    helpDialog.querySelector("h2").textContent = heading;
    const setShortcut = (selector, label, enabled) => {
      const description = helpDialog.querySelector(selector);
      if (!enabled) {
        description.parentElement.remove();
        return;
      }
      description.textContent = label;
    };
    setShortcut(".comic-keyboard-next-panel", nextPanel, panels.length);
    setShortcut(
      ".comic-keyboard-previous-panel",
      previousPanel,
      panels.length,
    );
    setShortcut(
      ".comic-keyboard-previous-episode",
      listNavigation ? previousList : previousEpisode,
      previousContentLink,
    );
    setShortcut(
      ".comic-keyboard-next-episode",
      listNavigation ? nextList : nextEpisode,
      nextContentLink,
    );
    setShortcut(
      ".comic-keyboard-previous-section",
      previousSection,
      previousSectionLink,
    );
    setShortcut(
      ".comic-keyboard-next-section",
      nextSection,
      nextSectionLink,
    );
    setShortcut(".comic-keyboard-first-panel", firstPanel, panels.length);
    setShortcut(".comic-keyboard-last-panel", lastPanel, panels.length);
    setShortcut(
      ".comic-keyboard-open-selection",
      openSelection,
      canActivatePanel,
    );
    helpDialog.querySelector(".comic-keyboard-go-back").textContent = goBack;
    helpDialog.querySelector(".comic-keyboard-page-top").textContent = pageTop;
    helpDialog.querySelector(".comic-keyboard-page-bottom").textContent =
      pageBottom;
    helpDialog.querySelector(".comic-keyboard-show-help").textContent =
      showHelp;
    helpDialog.querySelector("button").textContent = close;
    helpDialog.addEventListener("click", (event) => {
      if (event.target === helpDialog) helpDialog.close();
    });
    helpDialog.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      helpDialog.close();
    });
    document.body.appendChild(helpDialog);

    let helpTrigger = null;
    let pendingG = false;
    let pendingGTimer = null;
    let activePanel = null;

    helpDialog.addEventListener("close", () => {
      helpTrigger?.focus?.();
      helpTrigger = null;
    });

    const panelDestinations = () => {
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight,
      );
      return panels
        .filter((panel) => panel.getClientRects().length)
        .map((panel) => {
          const bounds = panel.getBoundingClientRect();
          return {
            panel,
            position: targetScrollTop(
              bounds.top + window.scrollY,
              bounds.height,
              viewportHeight,
              maxScroll,
            ),
          };
        })
        .sort((left, right) => left.position - right.position)
        .filter(
          (destination, index, values) =>
            index === 0 ||
            Math.abs(destination.position - values[index - 1].position) >
              positionTolerance,
        );
    };

    const scrollToDestination = (destination) => {
      if (!destination) return false;
      activePanel?.classList.remove("comic-keyboard-selected");
      activePanel = destination.panel;
      if (activationLinkFor(activePanel)) {
        activePanel.classList.add("comic-keyboard-selected");
      }
      window.scrollTo({
        top: destination.position,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      return true;
    };

    const clearPendingG = () => {
      pendingG = false;
      clearTimeout(pendingGTimer);
      pendingGTimer = null;
    };

    document.addEventListener("keydown", (event) => {
      const supportedKeys = [
        "PageDown",
        "PageUp",
        "j",
        "k",
        "h",
        "l",
        "H",
        "L",
        "g",
        "G",
        "Enter",
        "Backspace",
        "?",
      ];
      if (
        !supportedKeys.includes(event.key) ||
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        document.querySelector("dialog[open]") ||
        event.target.closest?.(
          'a, input, textarea, select, button, [contenteditable="true"], [role="textbox"]',
        )
      ) {
        return;
      }

      if (event.key !== "g") clearPendingG();

      if (event.key === "?") {
        event.preventDefault();
        helpTrigger = document.activeElement;
        helpDialog.showModal();
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        window.history.back();
        return;
      }

      if (event.key === "h" || event.key === "l") {
        const link =
          event.key === "h" ? previousContentLink : nextContentLink;
        if (!link) return;
        event.preventDefault();
        link.click();
        return;
      }

      if (event.key === "H" || event.key === "L") {
        const link =
          event.key === "H" ? previousSectionLink : nextSectionLink;
        if (!link) return;
        event.preventDefault();
        link.click();
        return;
      }

      if (event.key === "Enter") {
        const link = activationLinkFor(activePanel);
        if (!link) return;
        event.preventDefault();
        link.click();
        return;
      }

      const destinations = panelDestinations();
      if (!destinations.length) return;

      if (event.key === "g") {
        if (event.repeat) return;
        event.preventDefault();
        if (pendingG) {
          clearPendingG();
          scrollToDestination(destinations[0]);
        } else {
          pendingG = true;
          pendingGTimer = setTimeout(clearPendingG, 700);
        }
        return;
      }

      if (event.key === "G") {
        event.preventDefault();
        scrollToDestination(destinations[destinations.length - 1]);
        return;
      }

      const forward = event.key === "PageDown" || event.key === "j";
      const destination = forward
        ? destinations.find(
            ({ position }) =>
              position > window.scrollY + positionTolerance,
          )
        : [...destinations]
            .reverse()
            .find(
              ({ position }) =>
                position < window.scrollY - positionTolerance,
            );
      if (!destination) return;

      event.preventDefault();
      scrollToDestination(destination);
    });
  }

  return { init, targetScrollTop };
})();
