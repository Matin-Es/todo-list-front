import React from "react";
import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import { StyledDiv, StyledUl, StyledLi } from "./task.style";

const Task = (props) => {
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 12) + "..." : str;
  };
  return (
    <StyledDiv key={props.id}>
      <StyledUl onClick={props.onRequestOpen}>
        <StyledLi marginTop={props.marginTop}>{truncate(props.title)}</StyledLi>
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
      <div onClick={props.notifyHandler}>
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
      </div>
    </StyledDiv>
  );
};

export default Task;
