import { useContext, useState } from "react";
import { todosContext } from "../../context/todosContext";
import { REACT_APP_BASE_URL } from "../../config";
import { motion, AnimatePresence } from "framer-motion";
import { StyledInput, StyledDiv } from "./search.style";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import axios from "axios";
import Task from "../task/task";
import ModalBox from "../modal/modal";

const Search = () => {
  const { todos, setTodos } = useContext(todosContext);
  const [currentTodo, setCurrentTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const PER_PAGE = 4;

  const successNotify = (msg) => toast.success(msg);
  const errorNotify = (msg) => toast.error(msg);

  const openModal = (todoItem) => {
    setCurrentTodo(todoItem);
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }

  const getFilteredItems = (query, todos) => {
    if (!query) {
      return todos;
    } else {
      return todos.filter((todo) => todo.title.includes(query));
    }
  };
  const filteredItems = getFilteredItems(query, todos);
  const handlePageClick = ({ selected: selectedPage }) => {
    // console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
    setQuery("");
  };
  const offset = currentPage * PER_PAGE;
  const currentPageData = filteredItems.slice(offset, offset + PER_PAGE);

  const PageCount = Math.ceil(todos.length / PER_PAGE);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`${REACT_APP_BASE_URL}/todos/${id}/`)
        .then(() => {
          setTodos(
            todos.filter((todo) => {
              return todo.id !== id;
            })
          );
          successNotify("Task deleted Successfully");
        })
        .catch((error) => {
          if (error.response.status >= 500 && error.response.status <= 599) {
            errorNotify("Something went wrong, but that's not your fault");
          } else {
            errorNotify("Something went wrong");
          }
        });
    } else {
      return;
    }
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
    // console.log(x);

    axios
      .patch(`${REACT_APP_BASE_URL}/todos/${id}/`, {
        completed: x,
      })
      .then(
        (response) => {
          // console.log(response.data);

          setTodos((val) =>
            val.map((item) =>
              item.id === response.data.id ? response.data : item
            )
          );
        },
        (error) => {
          if (error.response.status >= 500 && error.response.status <= 599) {
            errorNotify("Something went wrong, but that's not your fault");
          } else {
            errorNotify("Something went wrong");
          }
        }
      );
  };
  const SearchOnChangeHandler = (e) => {
    setQuery(e.target.value);
    setCurrentPage(0);
  };

  // console.log(currentPage);
  const processChange = debounce((e, id) => saveInput(e, id));

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <StyledDiv>
      <StyledInput
        onChange={SearchOnChangeHandler}
        value={query}
        type="search"
        placeholder="search..."
        marginTop="25px"
      />
      <AnimatePresence>
        {currentPageData.map((todo) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              position: "absolute",
              y: -1000,
              transition: "1s",
            }}
            key={todo.id}
          >
            <Task
              key={todo.id}
              id={todo.id}
              onRequestOpen={() => openModal(todo)}
              deleteHandler={() => deleteHandler(todo.id)}
              onChange={(e) => processChange(e, todo.id)}
              notifyHandler={successNotify}
              htmlFor={todo.id}
              disabled={loading}
              placeholder={"completed"}
              title={todo.title}
              description={todo.description}
              checked={todo.completed}
              backgroundColor="#ffffff"
              marginTop="-5px"
            ></Task>
          </motion.div>
        ))}
      </AnimatePresence>
      <ModalBox
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentTodo={currentTodo}
        customStyles={customStyles}
        description={currentTodo.description}
      >
        Close
      </ModalBox>
      {todos.length > 0 && (
        <Pagination
          onPageChange={handlePageClick}
          pageCount={PageCount}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          previousLabel={"<"}
          nextLabel={">"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={0}
        />
      )}
    </StyledDiv>
  );
};

export default Search;
