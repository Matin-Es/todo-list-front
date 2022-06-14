import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
  const deleteHandler = (id) => {
    axios.delete(`http://127.0.0.1:8000/todo/todos/${id}/`);
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  /////////////////////////////////////////////////////////////////////////
  // firstly
  // npm i lodash.debounce
  // import { debounce } from "lodash";

  // const completedOnChangeHandler = debounce((e, id) => {
  //   const x = !e.target.checked;
  //   console.log(x);

  //   axios
  //     .patch(`http://127.0.0.1:8000/todo/todos/${id}/`, {
  //       completed: x,
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response.data);

  //         setTodos([response.data]);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //     },300);
  // the commented code above does the same thing as the code below ( only the debouncing is the same though)
  const debounce = (func, timeout = 350) => {
    let timer;

    return (...args) => {
      setLoading(true);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setLoading(false);
        func.apply(this, args);
      }, timeout);
    };
  };
  const saveInput = (e, id) => {
    const x = !e.target.checked;
    console.log(x);

    axios
      .patch(`http://127.0.0.1:8000/todo/todos/${id}/`, {
        completed: x,
      })
      .then(
        (response) => {
          console.log(response.data);

          setTodos((val) =>
            val.map((item) =>
              item.id === response.data.id ? response.data : item
            )
          );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const processChange = debounce((e, id) => saveInput(e, id));

  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todo/todos/").then((response) => {
      setTodos(response.data);
    });
  }, []);
  return (
    <form onSubmit={submitHandler}>
      <h1>Todo list</h1>

      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={titleOnChangeHandler}
      />
      <input
        type="text"
        placeholder="description"
        onChange={descriptionOnChangeHandler}
        value={description}
      />

      <button>Add</button>
      <div>
        {todos.map((todo) => (
          <ul key={todo.id}>
            <li>{todo.title}</li>
            <li>{todo.description}</li>
            <button disabled={loading} onClick={() => deleteHandler(todo.id)}>
              delete
            </button>
            <input
              type="checkbox"
              placeholder="completed"
              onChange={(e) => processChange(e, todo.id)}
              checked={todo.completed}
            />
          </ul>
        ))}
      </div>
    </form>
  );
};

export default Form;
