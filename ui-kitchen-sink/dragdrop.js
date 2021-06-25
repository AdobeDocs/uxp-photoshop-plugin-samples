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