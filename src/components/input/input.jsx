import { StyledInput } from "./input.style";
const Input = (props) => {
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      checked={props.checked}
      disabled={props.disabled}
      variant={props.variant}
      width={props.width}
      marginTop={props.marginTop}
    />
  );
};

export default Input;
