import e from "express";
import { Book } from "../models/bookModel.js";

const router = e.Router();
// cause we already using booksRoute as middleware then all the route will automatically has /books. so we just need to add the params that we need such as /:id
// Route for get All books from database
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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

// route for update a book in only specific part
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ meesage: "Book not found" });
    }
    return res.status(200).send({ message: "Book update succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ meesage: error.message });
  }
});

//  Route for deleting book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ meesage: "Book not found" });
    }
    return res.status(200).send({ message: "Book Deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ meesage: error.message });
  }
});

export default router;
