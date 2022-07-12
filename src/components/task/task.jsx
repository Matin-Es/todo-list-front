import React from "react";
import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import { StyledDiv, StyledUl, StyledLi } from "./task.style";

const Task = (props) => {
  return (
    <StyledDiv key={props.id}>
      <StyledUl>
        <StyledLi marginTop={props.marginTop}>{props.title}</StyledLi>
        {/* <li>{props.description}</li> */}
      </StyledUl>
      <Checkbox
        placeholder={props.placeholder}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
        id={props.id}
        htmlFor={props.htmlFor}
        type="checkbox"
      />
      <Button
        backgroundColor={props.backgroundColor}
        disabled={props.disabled}
        onClick={props.onClick}
        width=" 30px"
        height="30px"
        backgroundImage={"url(/trash-bin.svg)"}
        position="relative"
        top="10px"
        left="13px"
        type="button"
      >
        {props.children}
      </Button>
    </StyledDiv>
  );
};

export default Task;
