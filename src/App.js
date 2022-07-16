import "./App.css";
import Form from "./components/form/form";
import Header from "./components/header/header";
import Search from "./components/search/search";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <Form />
      <ToastContainer />
    </>
  );
}

export default App;
