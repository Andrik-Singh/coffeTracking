
import styled from 'styled-components';

const Input = ({ChangeCoffeList}) => {
  return (
    <StyledWrapper>
      <input onChange={(e)=>{
        ChangeCoffeList(e.target.value)
      }} placeholder="Enter the coffe" className="input" name="text" type="name" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    font-family: "SF Pro";
    max-width: 190px;
    padding: 0.875rem;
    font-size: 1rem;
    border: 1.5px solid #000;
    border-radius: 0.5rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
  }

  .input:focus {
    box-shadow: 5.5px 7px 0 black;
  }`;

export default Input;
