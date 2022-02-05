import express from "express";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const pictureName = req.body.pictureName;

    const unsplash = createApi({
      accessKey: process.env.ACCESS_KEY,
      fetch: nodeFetch,
    });

    unsplash.search
      .getPhotos({ query: pictureName, page: 1, perPage: 10 })
      .then((result) => {
        if (result.errors) {
          res.json({ success: false, message: result.errors[0] });
        } else {
          res.json({ success: true, message: result.response });
        }
      });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

export default router;
