const selectPage = pageId => {
    document.querySelectorAll(".page").forEach(page => {
        if (page.getAttribute("id") === pageId) {
            page.classList.add("visible");
            document.querySelector("#pageTitle").textContent = pageId;

            const pageCode = page.innerHTML;
            const trimmedPageCode = page.innerHTML.trimStart();
            const numberOfSpacesToTrim = pageCode.length - trimmedPageCode.length -1;
            const linesOfCode = pageCode.split("\n").map(line => line.substr(numberOfSpacesToTrim)).join("\n");
            document.querySelector("#code").textContent = linesOfCode
                .replace(/class="safe"/g, "")
                .replace(/class="fixedSize"/g, "");

            localStorage.setItem("currentPage", pageId);

            // fix cases where textfields may overlay content outside of the scrollable area
            page.scrollTop = 1;
            setTimeout(() => page.scrollTop = 0, 16);
        } else {
            page.classList.remove("visible");
        }
    });
};

document.querySelector("#selectedPage").addEventListener("change", evt => {
    selectPage(evt.target.value);
});

module.exports = {
    selectPage
};