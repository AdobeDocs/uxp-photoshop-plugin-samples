import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./src/routes.js";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/", routes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
