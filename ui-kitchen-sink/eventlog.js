
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


["click", "dblclick", "auxclick", "contextmenu",
 "mousedown", "mouseup", "mouseover", "mouseleave", "mouseenter", "mousemove", "mouseout", "mousewheel", "wheel",
 "input", "change", "keydown", "keyup", "keypress"
].forEach(evtName => {
  document.querySelector(".wrapper").addEventListener(evtName, logEvent);
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