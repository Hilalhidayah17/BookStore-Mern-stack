import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Books deleted successfully", { key: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error", { key: "error" });
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure to delete this book?</h3>
        <button
          className="bg-red-500 p-4 text-white my-4 w-full rounded-xl"
          onClick={handleDeleteBook}
        >
          Yes
        </button>
        <Link to={"/"} className="w-full">
          <button className="bg-gray-200 w-full rounded-xl p-4">No</button>
        </Link>
      </div>
    </div>
  );
}
