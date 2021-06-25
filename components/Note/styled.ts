import styled from 'styled-components';

const StyledNote = styled.div`
  background: #ebebeb;
  width: 400px;
  border-radius: 20px;
  height: fit-content;
  margin-top: 1rem;
  margin-left: 2rem;

  padding: 1rem 2rem;

  div {
    display: flex;
    justify-content: space-between;

    h3,
    input {
      margin: 1rem 0;
    }

    div {
      display: flex;
      align-items: center;

      svg {
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        padding: 0.5rem;
        transition: 0.2s all;
      }

      svg: hover {
        background: #f5f5f5;
      }
    }
  }
`;

export default StyledNote;
