import { useEffect, useState } from "react";
import { StyledForm, StyledDiv } from "./form.style";
import { REACT_APP_BASE_URL } from "../../config";
import { todosContext } from "./../../context/todosContext";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import Button from "../button/button";
import Input from "../input/input";
import Search from "./../search/search";
import Textarea from "../textarea/textarea";

const Form = () => {
  const [todos, setTodos] = useState([]);

  const errorNotify = (msg) => toast.error(msg);
  const successNotify = (msg) => toast.success(msg);

  let validate = yup.object().shape({
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
    // console.log(REACT_APP_BASE_URL);
    axios.get(`${REACT_APP_BASE_URL}/todos/`).then((response) => {
      setTodos(response.data);
    });
  }, []);

  const submitHandler = (values, { resetForm }) => {
    // console.log("Form submitted");

    axios.post(`${REACT_APP_BASE_URL}/todos/`, values).then(
      (response) => {
        // console.log(response.data);
        setTodos((prevTodos) => prevTodos.concat(response.data));
        successNotify("Task added Successfully");
      },
      (error) => {
        // console.log(error);
        if (error.response.status >= 500 && error.response.status <= 599) {
          return errorNotify("Something went wrong, but that's not your fault");
        } else {
          return errorNotify("Something went wrong");
        }
      }
    );
    resetForm({});
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => submitHandler(values, { resetForm })}
    >
      {(formik) => (
        // console.log(formik.values),
        <StyledForm>
          <div>
            <div>
              <Input
                value={formik.values.title}
                name="title"
                type="text"
                placeholder={"Title"}
                errorname="title"
                width={"276px"}
                margintop={"28px"}
              />
            </div>
            <div>
              <Textarea
                value={formik.values.description}
                name="description"
                type={"text"}
                placeholder={"description"}
                errorname="description"
                as="textarea"
              />
            </div>
            <StyledDiv>
              <Button
                onClick={successNotify}
                type="submit"
                backgroundColor={"#00B2FF"}
                hoverBackgroundColor={"#4dc9ff"}
                width={"115px"}
                height={"34px"}
                margintop={"18px"}
              >
                Add
              </Button>
            </StyledDiv>{" "}
            <todosContext.Provider value={{ todos, setTodos }}>
              <Search />
            </todosContext.Provider>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Form;
