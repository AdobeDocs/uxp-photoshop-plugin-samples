
// logging events
function logEvent(evt) {
  const eventType = evt.type;
  const filterElement = document.querySelector(`#chk${eventType}`);
  if (!filterElement.checked) return;

  const logs = document.querySelector("#logs");
  const evtText = `` +
                  `${evt.type} ${evt.target.tagName} ${evt.target.textContent.substr(0,10).replace(/\n/g,"")} ` +
                  `${evt.target.value !== undefined ? `Value: ${evt.target.value}` : ""} ` +
                  `${evt.target.checked !== undefined ? `Checked: ${evt.target.checked}` : ""} ` +
                  `${evt.target.selectedIndex !== undefined ? `Selected: ${evt.target.selectedIndex}` : ""} ` +
                  `${evt.which !== undefined ? `Which: ${evt.which}` : ""} ` +
                  `${evt.button !== undefined ? `Button: ${evt.button}` : ""} ` +
                  `${evt.altKey !== undefined ? `alt: ${evt.altKey}` : ""} ` +
                  `${evt.shiftKey !== undefined ? `shift: ${evt.shiftKey}` : ""} ` +
                  `${evt.ctrlKey !== undefined ? `ctrl: ${evt.ctrlKey}` : ""} ` +
                  `${evt.metaKey !== undefined ? `meta: ${evt.metaKey}` : ""} ` +
                  `${evt.key !== undefined ? `Key: ${evt.key}` : ""} ` +
                  `${evt.charCode !== undefined ? `char: ${evt.charCode}` : ""} ` +
                  `${evt.offsetX !== undefined ? `OffsetX: ${Math.floor(evt.offsetX)},` : ""} ` +
                  `${evt.offsetY !== undefined ? `${Math.floor(evt.offsetY)}` : ""} ` +
                  `${evt.clientX !== undefined ? `ClientX: ${Math.floor(evt.clientX)},` : ""} ` +
                  `${evt.clientY !== undefined ? `${Math.floor(evt.clientY)}` : ""} ` +
                  `${evt.screenX !== undefined ? `ScreenX: ${Math.floor(evt.screenX)},` : ""} ` +
                  `${evt.screenY !== undefined ? `${Math.floor(evt.screenY)}` : ""} ` +
                  `\n`;
  logs.innerText = (evtText + logs.innerText).split("\n").slice(0, 200).join("\n");
}


["click", "dblclick", "contextmenu",
 "mousedown", "mouseup", "mouseover", "mouseleave", "mouseenter", "mousemove", "mouseout",
 "pointerover", "pointerenter", "pointerdown", "pointermove", "pointerup", "pointercancel", "pointerout", "pointerleave",
 "input", "change", "keydown", "keyup", "focus", "blur", "load", "error", "mediaplayback", "uxpmediatracks", "paste",
 "loadstart", "loadstop", "loaderror", "message", "scroll"
].sort().forEach(evtName => {
  const toggle = document.createElement("sp-checkbox");
  toggle.className = "filter";
  toggle.setAttribute("id", `chk${evtName}`);
  toggle.textContent = evtName;
  document.querySelector("#eventToggles").appendChild(toggle);
  document.querySelector(".wrapper").addEventListener(evtName, logEvent, true);
});

document.querySelector("#toggleConsole").addEventListener("change", evt => {
  const checked = evt.target.checked;
  const theConsole = document.querySelector("#console");
  if (checked) {
    theConsole.classList.add("visible");
  } else {
    theConsole.classList.remove("visible");
  }
});

// change is broken in UXP 5.5.1 for sp-textfield, but is fixed in 5.5.2. This snippet
// ensures that your plugin logic can continue to receive change events, by listening
// for focus changes and firing the change event if the field's value had changed.
(function () {
  if(require("uxp").versions.uxp.startsWith("uxp-5.5.1")) {
    function fixChange() {
      let curField, curValue;
      document.addEventListener("focus", evt => {
        curField = evt.target;
        curValue = curField.value;
      }, true);
      document.addEventListener("blur", evt => {
        if (evt.target.tagName === "SP-TEXTFIELD") {
          if (curField === evt.target) {
            if (curValue !== evt.target.value) {
              const changeEvent = new Event("change", {
                bubbles: true
              });
              evt.target.dispatchEvent(changeEvent);
            }
          }
        }
      }, true);
    }
    fixChange();
  }
})();

// sp-textfield type=text is also slightly broken in 5.5.1, causing decimal points
// to be difficult to enter. If this bothers you, you may wish to implement this fix
// which replaces these fields with their text equivalent and adds some additional
// logic to enforce numeric values.
(function () {
  function fixNumericSpTextField() {
    if(require("uxp").versions.uxp.startsWith("uxp-5.5.1")) {
      const candidates = document.querySelectorAll("sp-textfield[type=number]");
      candidates.forEach(el => {
        el.setAttribute("type", "text");
        el.setAttribute("data-uxp-type", "number");
      });
    }
    document.addEventListener("input", evt => {
      const { target } = evt;
      if (target.tagName === "SP-TEXTFIELD") {
        if (target.getAttribute("data-uxp-type") === "number") {
          if (Number.isNaN(Number(target.value)) || target.value.indexOf(" ") > -1) {
            target.value = target.getAttribute("data-uxp-last-good-value") || "0";
          } else {
            target.setAttribute("data-uxp-last-good-value", target.value.trim());
          }
        }
      }
    });
    const timer = setInterval(() => {
      if (document._domClient) {
        console.log("sp-textfield[type=text] fix enabled");
        document._domClient.addEventListener("frameAck", fixNumericSpTextField);
        clearInterval(timer);
        fixNumericSpTextField();
      }
    }, 16);
  }
})();