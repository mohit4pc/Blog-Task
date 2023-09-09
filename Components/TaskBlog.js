import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Api_url } from "../BaseUrl";
import Table from "react-bootstrap/Table";
// import { toast } from "react-toastify";
const TaskBlog = () => {
  const [show1, setShow1] = useState(false);
  const handleshow1 = () => setShow1(false);
  const [post, setpost] = useState({ Title: "", Content: "", Author: "" });

  const handleShow1 = (id) => {
    axios
      .get(`${Api_url}blogs/${_id}`)
      .then((response) => {
        console.log(response, "JI>>>>>>>>>>>>>>>>");
        if (response.status == 200) {
          setShow1(true);
          post.Title = response.data.blogs?.Title;
          post.Content = response.data.blogs?.Content;
          post.Author = response.data.blogs?.Author;
        }

        setTimeout(() => {
          setpost({ ...post });
        }, 50);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleShow1();
    console.log(post);
  }, []);

  const { _id } = useParams();
  return (
    <>
      {" "}
      <Table striped bordered hover className="mt-5  py-5 px-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {_id}</td>
            <td>{post?.Title}</td>
            <td>{post?.Author}</td>
            <td>{post?.Content}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TaskBlog;
