import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import AllBlogs from "./Components/AllBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskBlog from "./Components/TaskBlog";
function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/blogs"} element={<AllBlogs />} />
            <Route path={"/TaskBlog/:_id"} element={<TaskBlog />} /> 
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
