import React from "react";
import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import { StyledDiv, StyledUl, StyledLi ,StyledSpan} from "./task.style";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const Task = (props) => {
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 12) + "..." : str;
  };
  return (
    <StyledDiv key={props.id}>
      <StyledUl onClick={props.onRequestOpen}>
        <Tooltip
          placement="top"
          trigger={props.title.length >= 11 ? ["hover"] : [""]}
          // visible={props.title.length >= 12 ? true : false}
          // defaultVisible={true}
          mouseEnterDelay={1.5}
          overlay={<StyledSpan>{props.title}</StyledSpan>}
        >
          <StyledLi marginTop={props.marginTop}>
            {truncate(props.title)}
          </StyledLi>
        </Tooltip>
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
          onClick={props.deleteHandler}
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
