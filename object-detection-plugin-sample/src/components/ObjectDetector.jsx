import React, { useEffect, useRef } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
const cocoSsd = require("@tensorflow-models/coco-ssd");
const axios = require("axios").default;

const base64 = require('base-64');
const utf8 = require('utf8');

const { localFileSystem: fs, fileTypes, formats } = require('uxp').storage;

function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64.encode(binary);
}

const ObjectDetector = () => {

  const imageRef = useRef();
  const containerRef = useRef();
  const boundingBoxContainer = useRef();


  async function detectObjects() {
    const img = await fs.getFileForOpening();
    const bin = await img.read({ format: formats.binary });
    try {
      const data = new FormData();
      data.append('image', bin, "image.jpg");

      const res = await axios.post("http://localhost:3000/detect", data);


      boundingBoxContainer.current.innerHTML = "";
      const imgBase64 = _arrayBufferToBase64(bin);
      imageRef.current.src = `data:image/jpeg;charset=utf-8;base64,${imgBase64}`;

      const { predictions } = res.data;
      predictions.forEach((prediction) => {
        const box = document.createElement("div");
        box.style.width = prediction.bbox[2] + "px";
        box.style.height = prediction.bbox[3] + "px";

        box.style.top = prediction.bbox[1] + "px";
        box.style.left = prediction.bbox[0] + "px";

        box.style.position="absolute";
        box.style.zIndex="100";

        box.style.border = "1px solid red";
        containerRef.current.appendChild(box);

        const label = document.createElement("div");
        label.innerText = `${prediction.class} ${prediction.score*100}%`;
        label.style.position="absolute";
        label.style.zIndex="100";
        label.style.top = prediction.bbox[1] + "px";
        label.style.left = prediction.bbox[0] + "px";
        label.style.backgroundColor = "red";
        label.style.color = "white";
        label.style.padding = "5px";
        label.style.fontSize = "12px";

        boundingBoxContainer.current.appendChild(label);
      });

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Image: </h1>
      <button onClick={() => {
        detectObjects();
      }}>Pick Image</button>
      <div style={{position: "relative"}} ref={containerRef}>
        <img style={{position: "absolute", top: 0, left: 0}} ref={imageRef} />
        <div ref={boundingBoxContainer}></div>
      </div>
    </>
  );
};

export default ObjectDetector;
