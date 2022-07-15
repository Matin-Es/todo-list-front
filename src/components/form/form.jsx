import { useEffect, useState } from "react";

import Button from "../button/button";
import Input from "../input/input";
import Search from "./../search/search";
import { StyledForm } from "./form.style";
import Task from "./../task/task";
import Textarea from "../textarea/textarea";
import axios from "axios";
import styled from "styled-components";
import { todosContext } from "./../../context/todosContext";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const Form = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todo/todos/").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    axios
      .post("http://127.0.0.1:8000/todo/todos/", {
        title,
        description,
      })
      .then(
        (response) => {
          console.log(response.data);
          setTodos((prevTodos) => prevTodos.concat(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
    setTitle("");
    setDescription("");
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
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
