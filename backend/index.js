import e from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bodyParser from "body-parser";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = e();

// use middleware bodyparser
app.use(bodyParser.json());
app.get("/", (req, res) => {});
// use booksRoute as middleware
app.use("/books", booksRoute);
// use cors as middleware
app.use(cors());

// connect database using mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    // run server only if database has connected
    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error();
  });
