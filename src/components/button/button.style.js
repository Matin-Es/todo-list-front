import styled from "styled-components";

export const StyledButton = styled.button`
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor};
  font-size: 18px;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
  text-align: center;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background-image: ${(props) => props.backgroundImage};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
  }

  :disabled {
    background-color: #dddddd;
  }
`;
