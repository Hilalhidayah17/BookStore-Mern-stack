import e from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bodyParser from "body-parser";

const app = e();

// use middleware bodyparser

app.use(bodyParser.json());
app.get("/", (req, res) => {});

// Route for get All books from database
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error();
    res.status(500).send({ message: error.message });
  }
});

// find book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.error();
    res.status(500).send({ message: error.message });
  }
});

// Route for save/create a new book using POST
app.post("/books", async (req, res) => {
  try {
    // verify if title,author,and publishYear field is exist. If not response by send status code 400
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : title,author,publishYear",
      });
    }
    // if all those field exist, create new object that has property of title,author, and publishYear which set to coresponding value in req.body
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    // insert newBook object to Book collection in database using create
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

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
