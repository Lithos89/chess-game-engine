
// Styling
import styled from "styled-components";

const LabelButton = styled.label`
  display: inline-block;
  flex: 1 0 0;

  cursor: pointer;

  & > input {
    visibility: hidden;
    position: absolute;
  }

  /* input[type="radio"]:checked >  {
    border: black solid 4px;
  } */

  input[type="radio"]:checked ~ .content .highlight {
    border: black solid 4px;
  }
`;

const Description = styled.h5`
  text-transform: capitalize;
  font-weight: 600;

  input[type="radio"]:checked ~ & {
    font-weight: bold;
  }
`;

const RadioButton = ({ value, children, checked, ...rest }) => {
  const id = value.toLowerCase();

  return(
    <LabelButton>
      <input type="radio" id={id} value={value} checked={checked} {...rest}/>
      <div className="content">
        {children}
      </div>
      <Description>{value}</Description>
      {/* <label htmlFor={id}>{value}</label> */}
    </LabelButton>
  )
};

export default RadioButton;
