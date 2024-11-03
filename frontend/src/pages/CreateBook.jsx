// Import necessary React hooks and components
import React from "react";
import { useState } from "react";
import BackButton from "../components/BackButton"; // Button to navigate back
import Spinner from "../components/Spinner"; // Spinner to show loading state
import axios from "axios"; // Library for making HTTP requests
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { useSnackbar } from "notistack";

// Component for creating a new book entry
export default function CreateBook() {
  // State variables to hold the values for title, author, publish year, and loading state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(""); // Year of publication
  const [loading, setLoading] = useState(false); // Loading indicator for saving data
  const { enqueueSnackbar } = useSnackbar();
  // useNavigate hook to redirect to a different page after saving the book
  const navigate = useNavigate();

  // Function to handle saving the new book data
  const handleSaveBook = () => {
    // Data object that will be sent to the server
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    // Send a POST request to the server to save the new book data
    axios
      .post("http://localhost:3000/books", data)
      .then(() => {
        // If the request is successful, stop loading and navigate back to the homepage
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        // If there is an error, stop loading, show an error message, and log the error
        setLoading(false);
        // alert("Error. Please try again");
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>

      {/* If loading is true, show the spinner */}
      {loading ? <Spinner /> : ""}

      {/* Form to collect book data */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on change
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // Update author state on change
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)} // Update publish year state on change
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>

        {/* Button to save the book, which triggers the handleSaveBook function */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}
