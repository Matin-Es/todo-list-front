import { StyledButton } from "./button.style";
const Button = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      backgroundImage={props.backgroundImage}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      margintop={props.margintop}
      width={props.width}
      height={props.height}
      position={props.position}
      top={props.top}
      left={props.left}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
