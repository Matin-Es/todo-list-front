import React from "react";
import { StyledCheckbox } from "./checkbox.style";
const Checkbox = (props) => {
  return (
    <p>
      <StyledCheckbox
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
      />
      <label htmlFor={props.htmlFor}></label>
    </p>
  );
};

export default Checkbox;
