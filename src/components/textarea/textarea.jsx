import { StyledTextarea, StyledDiv } from "./textarea.style";
import { useField, ErrorMessage } from "formik";
const Textarea = (props) => {
  const [field] = useField(props);

  return (
    <>
      <StyledTextarea
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        {...field}
        {...props}
      />

      <ErrorMessage
        name={props.errorname}
        component={"p"}
        render={(errmsg) => <StyledDiv>{errmsg}</StyledDiv>}
      />
    </>
  );
};

export default Textarea;
