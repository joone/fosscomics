window.FossbookMastodonShare = (() => {
  const storageKey = "fossbook-mastodon-server";
  const labelSets = {
    en: {
      heading: "Share on Mastodon",
      server: "Your Mastodon server",
      help: "Enter your server, for example techhub.social. Only the server address is remembered on this device.",
      submit: "Open Mastodon",
      close: "Cancel",
      invalidServer: "Enter a valid Mastodon server domain or HTTPS address, without a profile path.",
      popupBlocked: "Could not open Mastodon. Allow pop-ups and try again.",
      storageError: "Your server preference could not be read or saved on this device.",
      attachImage: "Attach the downloaded or copied panel image yourself; it is not attached automatically.",
    },
    ko: {
      heading: "Mastodon에 공유",
      server: "내 Mastodon 서버",
      help: "techhub.social처럼 서버 주소를 입력하세요. 서버 주소만 이 기기에 기억합니다.",
      submit: "Mastodon 열기",
      close: "취소",
      invalidServer: "프로필 경로 없이 올바른 Mastodon 서버 도메인 또는 HTTPS 주소를 입력하세요.",
      popupBlocked: "Mastodon을 열지 못했습니다. 팝업을 허용하고 다시 시도하세요.",
      storageError: "이 기기에서 서버 설정을 읽거나 저장하지 못했습니다.",
      attachImage: "저장하거나 복사한 장면 이미지를 직접 첨부하세요. 자동 첨부되지 않습니다.",
    },
  };

  function serverOrigin(value) {
    const input = value.trim();
    if (!input || /[\s\\?#]/.test(input) || !/^(?:https:\/\/)?[^/]+\/?$/i.test(input)) {
      throw new Error("Invalid Mastodon server");
    }
    const server = new URL(input.includes("://") ? input : `https://${input}`);
    if (
      server.protocol !== "https:" ||
      server.username || server.password ||
      server.pathname !== "/" ||
      !server.hostname.includes(".") ||
      server.hostname.length > 253 ||
      !server.hostname.split(".").every(label =>
        /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label),
      )
    ) throw new Error("Invalid Mastodon server");
    return server.origin;
  }

  const shareUrl = (server, text) =>
    `${serverOrigin(server)}/share?text=${encodeURIComponent(text)}`;
  let labels = labelSets.en;
  let dialog;
  let input;
  let status;
  let imageNote;
  let pendingText = "";
  let returnFocus;

  function init({ locale = "en", labels: overrides = {} } = {}) {
    const defaults = labelSets[String(locale).toLowerCase().split("-")[0]] || labelSets.en;
    labels = { ...defaults };
    for (const [key, value] of Object.entries(overrides)) {
      if (value) labels[key] = value;
    }
  }

  function createDialog() {
    dialog = document.createElement("dialog");
    dialog.className = "comic-share-dialog mastodon-share-dialog";
    dialog.setAttribute("aria-labelledby", "mastodon-share-heading");
    dialog.innerHTML =
      '<form class="comic-share-dialog-content">' +
        '<div class="comic-share-dialog-header">' +
          '<h2 id="mastodon-share-heading" class="comic-share-heading"></h2>' +
          '<button class="comic-share-close" type="button" autofocus></button>' +
        '</div>' +
        '<label class="comic-share-comment-label" for="mastodon-share-server"></label>' +
        '<input id="mastodon-share-server" class="comic-share-comment-input" type="text" inputmode="url" autocomplete="off" autocapitalize="none" spellcheck="false" aria-describedby="mastodon-share-help mastodon-share-status">' +
        '<p id="mastodon-share-help" class="mastodon-share-help"></p>' +
        '<p class="mastodon-share-image-note"></p>' +
        '<button class="comic-share-button mastodon-share-submit" type="submit"></button>' +
        '<p id="mastodon-share-status" class="comic-share-status" role="status" aria-live="polite"></p>' +
      '</form>';
    input = dialog.querySelector("input");
    status = dialog.querySelector('[role="status"]');
    imageNote = dialog.querySelector(".mastodon-share-image-note");
    dialog.querySelector(".comic-share-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener("close", () => {
      pendingText = "";
      if (returnFocus?.isConnected) returnFocus.focus();
      returnFocus = null;
    });
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      status.textContent = "";
    });
    dialog.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      let server;
      try {
        server = serverOrigin(input.value);
      } catch (error) {
        console.warn("Invalid Mastodon server", error);
        status.textContent = labels.invalidServer;
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }
      try {
        // Open synchronously from the submit gesture so popup blockers can allow it.
        const popup = window.open("about:blank", "_blank");
        if (!popup) throw new Error("Mastodon popup was blocked");
        popup.opener = null;
        popup.location.replace(shareUrl(server, pendingText));
      } catch (error) {
        console.error("Mastodon sharing failed", error);
        status.textContent = labels.popupBlocked;
        return;
      }
      try {
        window.localStorage.setItem(storageKey, server);
      } catch (error) {
        console.warn("Mastodon server preference could not be saved", error);
        status.textContent = labels.storageError;
        return;
      }
      dialog.close();
    });
    document.body.appendChild(dialog);
  }

  function open(text, { attachImage = false } = {}) {
    if (!dialog) createDialog();
    returnFocus = document.activeElement;
    pendingText = text;
    dialog.querySelector("h2").textContent = labels.heading;
    dialog.querySelector("label").textContent = labels.server;
    dialog.querySelector(".mastodon-share-help").textContent = labels.help;
    dialog.querySelector(".comic-share-close").textContent = labels.close;
    dialog.querySelector(".mastodon-share-submit").textContent = labels.submit;
    imageNote.textContent = labels.attachImage;
    imageNote.hidden = !attachImage;
    status.textContent = "";
    input.value = "";
    input.removeAttribute("aria-invalid");
    try {
      input.value = window.localStorage.getItem(storageKey) || "";
    } catch (error) {
      console.warn("Mastodon server preference could not be read", error);
      status.textContent = labels.storageError;
    }
    dialog.showModal();
  }

  return { init, open, serverOrigin, shareUrl };
})();
