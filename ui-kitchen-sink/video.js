
let playbackTimer;
document.querySelector("#playVideo").onclick = () => {
  document.querySelector("video").play();
  if (playbackTimer) {
    clearInterval(playbackTimer);
      playbackTimer = null;
  }
  playbackTimer = setInterval(() => {
    try {
      document.querySelector("#currentTime").textContent = document.querySelector("video").currentTime;
    } catch (err) {
      clearInterval(playbackTimer);
      playbackTimer = null;
    }
  }, 150)
}

document.querySelector("#stopVideo").onclick = () => {
  document.querySelector("video").stop();
  clearInterval(playbackTimer);
  playbackTimer = null;
}