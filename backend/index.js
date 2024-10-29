import e from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = e();

app.get("/", (req, res) => {});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error();
  });
