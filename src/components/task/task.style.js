import styled from "styled-components";
export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
 
`;
export const StyledUl = styled.ul`
  margin-top: 26px;
  cursor: pointer;
`;
export const StyledLi = styled.li`
  padding: 10px;
  font-size: 16px;
  border-width: 0px;
  border-color: #ffffff;
  background-color: #ffffff;
  color: #3a3a3a;
  font-weight: bold;
  border-style: hidden;
  border-radius: 8px;

  text-shadow: 0px 0px 0px rgba(66, 66, 66, 0);
  font-family: "Inter", sans-serif;
  width: 196px;
  margin-top: ${(props) => props.marginTop};
`;
