require("./createTreeWalker.js");
require("./createNodeIterator.js");
const Mark = require("./mark.js");

let instance = new Mark(document.querySelector(".content"));
let numberOfMatches = 0;
let currentMatchIdx = 0;
let currentMatch;

function nextMatch() {
    if (!currentMatch) {
        currentMatch = document.querySelector("mark");
        currentMatchIdx = 0;
        currentMatch.scrollIntoView(true);
    } else {

        currentMatch.classList.remove("current");
        const matches = document.querySelectorAll("mark");
        currentMatchIdx++;
        if (currentMatchIdx >= matches.length) {
            currentMatchIdx = 0;
        }
        currentMatch = matches[currentMatchIdx];
        currentMatch.scrollIntoView(false);
    }

    currentMatch.classList.add("current");
    document.querySelector("#searchPos").textContent = `${currentMatchIdx + 1} of ${numberOfMatches}`;
}

function prevMatch() {
    const matches = document.querySelectorAll("mark");

    if (!currentMatch) {
        currentMatch = matches[matches.length - 1];
        currentMatchIdx = matches.length - 1;
        currentMatch.scrollIntoView(false);
    } else {

        currentMatch.classList.remove("current");
        currentMatchIdx--;
        if (currentMatchIdx < 0)  {
            currentMatchIdx = matches.length - 1;
        }
        currentMatch = matches[currentMatchIdx];
        currentMatch.scrollIntoView(true);
    }

    currentMatch.classList.add("current");
    document.querySelector("#searchPos").textContent = `${currentMatchIdx + 1} of ${numberOfMatches}`;
}

function searchForPhrase() {
    instance.unmark();
    const thePhrase = document.querySelector("#txtPhrase").value;
    instance.mark(thePhrase.trim(), {acrossElements: true, separateWordSearch: false});

    setTimeout(() => {
        numberOfMatches = document.querySelectorAll("mark").length;
        currentMatch = null;

        if (numberOfMatches === 0) {
            document.querySelector("#searchPos").textContent = `No matches`;
        } else {
            nextMatch();
        }
    }, 250);
}

document.querySelector("#txtPhrase").addEventListener("keydown", evt => {
    if (evt.key === "Enter") {
        searchForPhrase();
        document.querySelector("#btnNext").focus();
    }
});
document.querySelector("#btnSearch").onclick = searchForPhrase;
document.querySelector("#btnPrev").onclick = prevMatch;
document.querySelector("#btnNext").onclick = nextMatch;


