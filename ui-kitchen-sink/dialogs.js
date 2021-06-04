// sp-dialog handling
const spDialogs = [
  ["showInfoSpDialog",        "infoSpDialog"],
  ["showErrorSpDialog",       "errorSpDialog"],
  ["showDestructiveSpDialog", "destructiveSpDialog"],
  ["showConfirmSpDialog",     "confirmSpDialog"],
  ["showCustomSpDialog",      "customSpDialog"],
];
spDialogs.forEach(([btn, dlg]) => {
  const btnEl = document.querySelector(`#${btn}`);
  const dlgEl = document.querySelector(`#${dlg}`);
  if (btnEl && dlgEl) {
    btnEl.onclick = () => dlgEl.setAttribute("open");
  }
  if (dlgEl) {
    const allTheButtons = document.querySelectorAll(`#${dlg} sp-button`);
    allTheButtons.forEach(el => {
      el.onclick = () => dlgEl.removeAttribute("open");
    });
  }
});


// dialog handling
document.querySelector("#btnOpenDialog").onclick = () => {
  document.querySelector("#dlgExample").uxpShowModal({
    title: "Dialog Example",
    resize: "none", // "both", "horizontal", "vertical",
    size: {
      width: 480,
      height: 240
    }
  });
};

// enable dialog buttons to close
Array.from(document.querySelectorAll("#dlgExample sp-button")).forEach(button => {
  button.onclick = () => document.querySelector("#dlgExample").close();
});


// programmatic dialog
const openProgrammaticDialog = async () => {
  const theDialog = document.createElement("dialog");
  const theForm = document.createElement("form");
  const theHeading = document.createElement("sp-heading");
  const theDivider = document.createElement("sp-divider");
  const theBody = document.createElement("sp-body");
  const theFooter = document.createElement("footer");
  const theActionButton = document.createElement("sp-button");
  const theCancelButton = document.createElement("sp-button");

  theHeading.textContent = "Vectorize Images?";
  theDivider.setAttribute("size", "large");
  theBody.textContent = "Are you sure you want to vectorize the images? This might take some time.";
  theActionButton.textContent = "Vectorize";
  theActionButton.setAttribute("variant", "cta");
  theCancelButton.textContent = "Don't Vectorize";
  theCancelButton.setAttribute("quiet", "true");
  theCancelButton.setAttribute("variant", "secondary");

  theActionButton.onclick = () => { 
    theDialog.close("ok");
  }
  theCancelButton.onclick = () => {
    theDialog.close("reasonCanceled");
  }

  theFooter.appendChild(theCancelButton);
  theFooter.appendChild(theActionButton);

  theForm.appendChild(theHeading);
  theForm.appendChild(theDivider);
  theForm.appendChild(theBody);
  theForm.appendChild(theFooter);
  theDialog.appendChild(theForm);
  document.body.appendChild(theDialog);

  const r = await theDialog.uxpShowModal({
    title: "Programmatic Dialog",
    resize: "none", // "both", "horizontal", "vertical",
    size: {
      width: 480,
      height: 240
    }
  });
  console.log(r);
  theDialog.remove();
}
document.querySelector("#btnOpenPDialog").onclick = openProgrammaticDialog;

module.exports = {
    openProgrammaticDialog
};