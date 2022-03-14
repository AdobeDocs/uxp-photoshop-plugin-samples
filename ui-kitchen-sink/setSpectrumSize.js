
function setSpectrumSize(size) {
  const allSpectrumSelectors = [
    "sp-body",
    "sp-detail",
    "sp-label",
    "sp-heading",
    "sp-button",
    "sp-action-button",
    "sp-checkbox",
    "sp-radio",
    "sp-textfield",
    "sp-textarea",
    "sp-progress",
    "sp-slider",
    "sp-tooltip",
    "sp-icon", 
    "sp-menu",
    "sp-dropdown",
    "sp-link"
  ];
  document.querySelectorAll(allSpectrumSelectors.map(sel => `${sel}:not(.fixedSize)`).join(", ")).forEach(el => el.setAttribute("size", size));

}
document.querySelector("#size").addEventListener("change", evt => {
  const target = evt.target;
  setSpectrumSize(target.value);
})