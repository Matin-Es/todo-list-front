import { StyledInput, StyledDiv } from "./input.style";
import { useField, ErrorMessage } from "formik";
const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <StyledInput
        htmlFor={props.htmlFor}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
        variant={props.variant}
        width={props.width}
        margintop={props.margintop}
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

export default Input;
