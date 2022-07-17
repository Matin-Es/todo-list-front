import { StyledButton } from "./button.style";
const Button = (props) => {
  return (
    <StyledButton
      variant={props.variant}
      disabled={props.disabled}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      margintop={props.margintop}
      width={props.width}
      height={props.height}
      backgroundImage={props.backgroundImage}
      position={props.position}
      top={props.top}
      left={props.left}
      type={props.type}
      hoverBackgroundColor={props.hoverBackgroundColor}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
