import { useContext, useState } from "react";

import Pagination from "../pagination/pagination";
import { StyledInput, StyledDiv } from "./search.style";
import Task from "../task/task";
import axios from "axios";
import { todosContext } from "../../context/todosContext";
import { motion, AnimatePresence } from "framer-motion";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const { todos, setTodos } = useContext(todosContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 4;

  const getFilteredItems = (query, todos) => {
    if (!query) {
      return todos;
    } else {
      return todos.filter((todo) => todo.title.includes(query));
    }
  };
  const filteredItems = getFilteredItems(query, todos);
  const handlePageClick = ({ selected: selectedPage }) => {
    console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
    setQuery("");
  };
  const offset = currentPage * PER_PAGE;
  const currentPageData = filteredItems.slice(offset, offset + PER_PAGE);

  const PageCount = Math.ceil(todos.length / PER_PAGE);

  const deleteHandler = (id) => {
    axios.delete(`http://127.0.0.1:8000/todo/todos/${id}/`);
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

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
  const SearchOnChangeHandler = (e) => {
    setQuery(e.target.value);
    setCurrentPage(0);
  };

  console.log(currentPage);
  const processChange = debounce((e, id) => saveInput(e, id));

  return (
    <StyledDiv>
      <StyledInput
        type="search"
        marginTop="25px"
        onChange={SearchOnChangeHandler}
        placeholder="search..."
        value={query}
      />{" "}
      <AnimatePresence>
        {currentPageData.map((todo) => (
          <motion.div    initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0,position:"absolute",y:-1000,transition:"1s" }} key={todo.id}>
          <Task
            key={todo.id}
            title={todo.title}
            description={todo.description}
            backgroundColor="#ffffff"
            disabled={loading}
            onClick={() => deleteHandler(todo.id)}
            placeholder={"completed"}
            onChange={(e) => processChange(e, todo.id)}
            checked={todo.completed}
            id={todo.id}
            htmlFor={todo.id}
            marginTop="-5px"
          ></Task></motion.div>
        ))}
      </AnimatePresence>
      {todos.length > 0 && (
        <Pagination
          pageCount={PageCount}
          onPageChange={handlePageClick}
          previousLabel={"<"}
          nextLabel={">"}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={0}
        />
      )}
    </StyledDiv>
  );
};

export default Search;
