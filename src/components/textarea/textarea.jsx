import React from "react";
import { StyledTextarea, StyledDiv } from "./textarea.style";
import { useField, ErrorMessage } from "formik";
const Textarea = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <StyledTextarea
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        {...field}
        {...props}
      />

      <ErrorMessage
        component={"p"}
        name={props.errorname}
        render={(errmsg) => <StyledDiv>{errmsg}</StyledDiv>}
      />
    </>
  );
};

export default Textarea;
