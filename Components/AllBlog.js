import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Api_url } from "../BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AllBlog() {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Content, setContent] = useState("");
  const data = { Title, Author, Content };
  const navigate = useNavigate();
  // console.log(data);
  const sumbitForm = (e) => {
    e.preventDefault();
    axios
      .post(Api_url + "blogs", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-5">
        <h1>New Blogs</h1>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
        <Form.Label>Author </Form.Label>
        <Form.Control type="text" onChange={(e) => setAuthor(e.target.value)} />
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="secondary" className="mt-4" onClick={sumbitForm}>
          Add Blogs
        </Button>
      </div>
    </>
  );
}

export default AllBlog;
