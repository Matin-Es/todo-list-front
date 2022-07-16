import { useEffect, useState } from "react";

import Button from "../button/button";
import Input from "../input/input";
import Search from "./../search/search";
import { StyledForm, StyledDiv } from "./form.style";
import Task from "./../task/task";
import Textarea from "../textarea/textarea";
import axios from "axios";
import styled from "styled-components";
import { todosContext } from "./../../context/todosContext";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const Form = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const errorNotify = (msg) => toast.error(msg);
  const successNotify = (msg) => toast.success(msg);

  let schema = yup.object().shape({
    title: yup
      .string()
      .required("Title field is required")
      .max(200, "maximum length is 200 characters"),
    description: yup
      .string()
      .required("Description field is required")
      .max(3000, "maximum length is 3000 characters"),
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todo/todos/").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (!error) {
      axios
        .post("http://127.0.0.1:8000/todo/todos/", {
          title,
          description,
        })
        .then(
          (response) => {
            console.log(response.data);
            setTodos((prevTodos) => prevTodos.concat(response.data));
            successNotify("Task added Successfully");
          },
          (error) => {
            console.log(error);
            if (error.response.status === 400) {
              return errorNotify("");
            } else if (
              error.response.status >= 500 &&
              error.response.status <= 599
            ) {
              return errorNotify(
                "Something went wrong, but that's not your fault"
              );
            } else {
              return errorNotify("Something went wrong");
            }
          }
        );
    } else {
      errorNotify(error);
    }
    setTitle("");
    setDescription("");
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
    // if (e.target.value.length >= 201) {
    //   setError("Title should be less than 200 characterssssss");
    // } else {
    //   setError("");
    // }
    console.log(title);
  };
  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
    // if (e.target.value.length >= 201) {
    //   setError("Description should be less than 3000 characterssssss");
    // } else {
    //   setError("");
    // }
    console.log(description);
  };

  return (
    <StyledForm schema onSubmit={submitHandler}>
      <div>
        <div>
          {" "}
          <Input
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={titleOnChangeHandler}
            variant="text"
            width={"276px"}
            marginTop={"28px"}
          />
        </div>
        <div>{error}</div>
        <div>
          {" "}
          <Textarea
            type={"text"}
            placeholder={"description"}
            onChange={descriptionOnChangeHandler}
            value={description}
          />
        </div>
        <StyledDiv>
          {" "}
          <Button
            backgroundColor={"#00B2FF"}
            marginTop={"18px"}
            width={"115px"}
            height={"34px"}
            hoverBackgroundColor={"#4dc9ff"}
            onClick={successNotify}
          >
            Add
          </Button>
        </StyledDiv>{" "}
        <todosContext.Provider value={{ todos, setTodos }}>
          <Search />
        </todosContext.Provider>
      </div>
    </StyledForm>
  );
};

export default Form;
