import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import { Api_url } from "../BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Home() {
  const [data, setData] = useState([]);
  const [post, setpost] = useState({ Title: "", Content: "", Author: "" });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  // console.log(id);
  const onChange = (e) => {
    const { name, value } = e.target;
    setpost((preview) => ({ ...preview, [name]: value }));
  };
  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (id) => {
    axios
      .get(`${Api_url}blogs/${id}`)
      .then((response) => {
        console.log(response, "<<<<<");
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
    axios.get(Api_url + "blogs").then((response) => {
      setData(response.data.blogs);
    });
  }, []);

  // console.log(data);
  useEffect(() => {
    axios.get(Api_url + "blogs").then((response) => {
      setData(response.data.blogs);
    });
  }, []);

  const updatePost = async (id) => {
    await axios
      .put(`${Api_url}blogs/${id}`, post)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Task updated Successfully");
          setShow1(false);
          axios.get(Api_url + "blogs").then((response) => {
            setData(response.data.blogs);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    fetch(Api_url + "blogs/" + id, {
      method: "DELETE",
    })
      .then((data) => {
        if (data.status === 200) {
          toast.success("Task Deleted Successfully");
          axios.get(Api_url + "blogs").then((response) => {
            setData(response.data.blogs);
          });
          handleClose();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="container mt-5 justify-content-end">
        <div className="row">
          <div className="col-md-12">
            <Button variant="primary">
              <Link
                to={"/blogs"}
                className="text-black text-decoration-none d-flex align-items-center gap-2"
              >
                <GrAddCircle />
                Create Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {data.map((row, index) => (
            <>
              <div className="col-md-4 mb-3" key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{row.Title}</Card.Title>
                    <Card.Text>{row.Content}</Card.Text>
                    <div className="d-flex gap-2">
                      <Link to={`/TaskBlog/${row._id}`}>Read More</Link>
                      <Button variant="success">
                        <AiOutlineEdit onClick={() => handleShow1(row?._id)} />
                      </Button>
                      <Button variant="danger" onClick={() => setId(row._id)}>
                        <AiOutlineDelete onClick={handleShow} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Blog </Modal.Title>
                </Modal.Header>
                <div className="container mt-5">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="Title"
                    value={post?.Title}
                    onChange={onChange}
                  />
                  <Form.Label>Author </Form.Label>
                  <Form.Control
                    type="text"
                    name="Author"
                    value={post?.Author}
                    onChange={onChange}
                  />
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    name="Content"
                    value={post?.Content}
                    onChange={onChange}
                  />
                </div>
                <Modal.Body className="justify-content-center d-flex">
                  <Button
                    onClick={() => {
                      updatePost(row?._id);
                    }}
                    variant="danger"
                    className="me-3"
                  >
                    Confirm
                  </Button>
                  <Button variant="secondary" onClick={handleClose1}>
                    Close Modal
                  </Button>
                </Modal.Body>
              </Modal>
            </>
          ))}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center d-flex">
          <Button variant="danger" className="me-3" onClick={handleDelete}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
