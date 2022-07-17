import styled from "styled-components";
import { Field } from "formik";
export const StyledInput = styled(Field)`
  padding: 10px;
  font-size: 16px;
  border-width: 0px;
  border-color: #ffffff;
  background-color: #ffffff;
  color: #4f4f4f;
  border-style: hidden;
  border-radius: 8px;
  box-shadow: 0px 0px 7px rgba(196, 196, 196, 0.75);
  text-shadow: 0px 0px 0px rgba(66, 66, 66, 0);
  font-family: "Inter", sans-serif;
  width: ${(props) => props.width};
  margin-top: ${(props) => props.margintop};

  :focus {
    outline: none;
  }
`;

export const StyledDiv = styled.div`
  font-family: "Inter", sans-serif;
  margin-top: 5px;
  color: red;
`;
