import React from "react";
import { StyledTextarea } from "./textarea.style";

const Textarea = (props) => {
  return (
    <div>
      <StyledTextarea
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Textarea;
