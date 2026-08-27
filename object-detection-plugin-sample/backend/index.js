const express = require("express");
const multer  = require('multer');
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-backend-webgl');
const tf = require('@tensorflow/tfjs');
const imageGet = require('get-image-data');
const cocoSsd = require('@tensorflow-models/coco-ssd');

const { createCanvas, loadImage } = require('canvas')


const upload = multer({ dest: 'uploads/' })
const app = express();


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/detect", upload.single('image'), async (req, res) => {
    const model = await cocoSsd.load();
    
    loadImage(req.file.path).then((image) => {
        const { width, height } = image;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        model.detect(canvas).then((predictions) => {
            res.json({predictions, width, height});
        });
      })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
