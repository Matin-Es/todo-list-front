import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Form from "./components/form/form";
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
