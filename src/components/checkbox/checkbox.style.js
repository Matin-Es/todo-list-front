import styled from "styled-components";
export const StyledCheckbox = styled.input`
  /* Base for label styling */
  &:not(:checked),
  &:checked {
    position: absolute;
    left: -9999px;
  }
  &:not(:checked) + label,
  &:checked + label {
    position: relative;
    padding-left: 32px;
    cursor: pointer;
    margin-bottom: 4px;
    display: inline-block;
    font-size: 16px;
  }
  /* checkbox aspect */
  &:not(:checked) + label:before,
  &:checked + label:before {
    content: "";
    position: absolute;
    left: 7px;
    top: -7px;
    width: 30px;
    height: 30px;
    border: 0px hidden #cccccc;
    background: #ffffff;
    border-radius: 3px;
  }
  /* checked mark aspect */
  &:not(:checked) + label:after,
  &:checked + label:after {
    content: "✔";
    position: absolute;
    top: -7px;
    left: 10px;
    font-size: 30px;
    line-height: 1.1;
    color: #10a64a;
    transition: all 0.2s;
  }
  /* checked mark aspect changes */
  &:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }
  &:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }
  /* disabled checkbox */
  &:disabled:not(:checked) + label:before,
  &:disabled:checked + label:before {
    box-shadow: none;
    border-color: #999999;
    background-color: #dddddd;
  }
  &:disabled:checked + label:after {
    color: #999999;
  }
  &:disabled + label {
    color: #aaaaaa;
  }
  /* accessibility */
  &:checked:focus + label:before,
  &:not(:checked):focus + label:before {
    border: 2px dotted #ffffff;
  }
  /* hover style just for information */
  label:hover:before {
    border: 2px solid #ffffff !important;
    background: #eaeaea;
  }
`;
