import { StyledDiv, StyledUl, StyledLi, StyledSpan } from "./task.style";
import Tooltip from "rc-tooltip";
import Checkbox from "../checkbox/checkbox";
import Button from "../button/button";
import "rc-tooltip/assets/bootstrap.css";

const Task = (props) => {
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 12) + "..." : str;
  };
  return (
    <StyledDiv>
      <StyledUl onClick={props.onRequestOpen}>
        <Tooltip
          trigger={props.title.length >= 11 ? ["hover"] : [""]}
          mouseEnterDelay={1.5}
          placement="top"
          overlay={<StyledSpan>{props.title}</StyledSpan>}
        >
          <StyledLi marginTop={props.marginTop}>
            {truncate(props.title)}
          </StyledLi>
        </Tooltip>
      </StyledUl>
      <Checkbox
        id={props.id}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
        htmlFor={props.htmlFor}
        placeholder={props.placeholder}
        type="checkbox"
      />
      <div onClick={props.notifyHandler}>
        <Button
          onClick={props.deleteHandler}
          disabled={props.disabled}
          backgroundColor={props.backgroundColor}
          backgroundImage={"url(/trash-bin.svg)"}
          type="button"
          position="relative"
          top="10px"
          left="13px"
          width=" 30px"
          height="30px"
        >
          {props.children}
        </Button>
      </div>
    </StyledDiv>
  );
};

export default Task;
