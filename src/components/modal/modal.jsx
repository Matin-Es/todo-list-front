import React from "react";
import Modal from "react-modal";
import Button from "../button/button";
import { StyledP } from "./modal.style";
import "./modal.css";

const ModalBox = (props) => {
  Modal.setAppElement(document.getElementById("root"));
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={props.customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={200}
      overlayClassName="Overlay"
      className="Modal"
    >
      {props.currentTodo && <StyledP>{props.description}</StyledP>}
      <Button
        backgroundColor="#B0C4DE"
        hoverBackgroundColor={"#bbc8d8"}
        onClick={props.closeModal}
        position="sticky"
        top={"80%"}
        left={"44.5%"}
      >
        {props.children}
      </Button>
    </Modal>
  );
};

export default ModalBox;
