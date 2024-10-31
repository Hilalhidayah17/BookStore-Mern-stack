import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";

export default function ShowBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        const result = response.data;
        console.log(result);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Id</span>
            <span>{books._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Title</span>
            <span>{books.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <span>{books.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Publish Year</span>
            <span>{books.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Create Time</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Last Update Time</span>
            <span>{new Date(books.updateAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
