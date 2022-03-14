{
    /* Support list re-ordering */
    const list = document.querySelector(".reorderable");

    function dragStart(evt) {
        const target = evt.target;
        const dataTransfer = evt.dataTransfer;
        dataTransfer.effectAllowed = "all";

        dataTransfer.setData("text/json", JSON.stringify({
            key: target.getAttribute("data-key")     
        }));
        dataTransfer.setDragImage(target);

        /* create drop targets */
        const dropTargetEl = () => {
            const el = document.createElement("div");
            el.className = "target";
            return el;
        }
        const listEls = Array.from(list.children);
        listEls.forEach(el => {
            list.insertBefore(dropTargetEl(), el);
        })
        list.appendChild(dropTargetEl());
    }

    function dragOver(evt) {
        if (evt.target.classList.contains("target") || evt.target.getAttribute("data-key")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.dataTransfer.dropEffect = "copy";
        }
        if (evt.target.classList.contains("target")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.target.classList.add("active");
        } else if (evt.target.getAttribute("data-key")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.target.nextElementSibling.classList.add("active");
        }
    }

    function dragEnter(evt) {
        if (evt.target.classList.contains("target") || evt.target.getAttribute("data-key")) {
            evt.preventDefault();
            evt.stopPropagation();
        }
    }

    function dragLeave(evt) {
        if (evt.target.classList.contains("target")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.target.classList.remove("active");
        } else if (evt.target.getAttribute("data-key")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.target.nextElementSibling.classList.remove("active");
        }
    }

    function drop(evt) {
        const target = evt.target;
        if (target.classList.contains("target") || target.getAttribute("data-key")) {
            console.log(target);
            const json = evt.dataTransfer.getData("text/json");
            let key;
            if (json) {
                key = JSON.parse(json).key;
            }
            if (key) {
                console.log(key)
                const movingEl = list.querySelector(`[data-key="${key}"]`);
                if (target.nextElementSibling) {
                    list.insertBefore(movingEl, target.nextElementSibling);
                } else {
                    list.appendChild(movingEl);
                }
            }
        }
    }

    function dragEnd(evt) {
        const listEls = Array.from(list.querySelectorAll(".target"));
        listEls.forEach(el => el.remove());
    }

    list.addEventListener("dragstart", dragStart);
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("dragend", dragEnd);
    list.addEventListener("drop", drop);

}


{
    /* Support Draggable Images */
    function dragStart(event) {
        console.log("here");
        const target = event.target;
        if (!target.classList.contains("draggable-image")) return;

        const dataTransfer = event.dataTransfer;

        const mimeType = target.dataset.dragMimeType || "image/jpg";
        dataTransfer.effectAllowed = "all";

        dataTransfer.setData("text/uri-list", target.src); //file:/// or data:base64,png;asdfasf
        dataTransfer.setData("text/html", `<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><img alt="Image" src="${target.src}"/>`);
        dataTransfer.setDragImage(target);
    }

    function dragEnd(event) {

    }

    document.body.addEventListener("dragstart", dragStart);
    document.body.addEventListener("dragend", dragEnd);
}

{
    /* Support Drop Zones */
    function dragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.dataTransfer.dropEffect = "copy";
    }

    function dragEnter(evt) {
        evt.preventDefault();
        evt.stopPropagation();

    }

    function dragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();

    }

    function drop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        let data = {};
        evt.dataTransfer.types.forEach(type => {
            data[type] = evt.dataTransfer.getData(type);
        });

        evt.target.innerText = JSON.stringify(data, null, 2);
    }

    const dropZone = document.querySelector(".drop-zone");
    dropZone.addEventListener("dragover", dragOver);
    dropZone.addEventListener("dragenter", dragEnter);
    dropZone.addEventListener("dragleave", dragLeave);
    dropZone.addEventListener("drop", drop);

}