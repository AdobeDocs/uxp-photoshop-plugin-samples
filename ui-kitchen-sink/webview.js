// webview example
const webview = document.querySelector("#webviewFrame");
document.querySelector("#showWebview").onclick = () => {
  const webviewModal = document.querySelector("#webviewModal");
  webviewModal.uxpShowModal({
    title: "Webview in a Dialog",
    resize: "both",
    size: {
      width: 480,
      height: 320
    }
  });
}

document.querySelector("#navigate").onclick = () => {
  const url = document.querySelector("#url").value;
  webview.setAttribute("src", url);
}

const webviewStatus = document.querySelector("#webviewStatus");
webview.addEventListener("loadstart", evt => webviewStatus.textContent = "Loading...");
webview.addEventListener("loadstop", evt => webviewStatus.textContent = "Loaded");
webview.addEventListener("loaderror", evt => webviewStatus.textContent = "Error " + evt.message);