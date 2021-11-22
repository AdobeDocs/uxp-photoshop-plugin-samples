import React from "react";
import fs from "fs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import cocoSsd from "@tensorflow-models/coco-ssd";

const ObjectDetector = async () => {
  const img = fs.readFile("../assets/image.jpg", function (err, data) {
    if (err) throw err;
    else return data;
  });

  const model = await cocoSsd.load();

  const predictions = await model.detect(img);

  console.log("Predictions: ");
  console.log(predictions);

  return <h1>{predictions}</h1>;
};

export default ObjectDetector;
