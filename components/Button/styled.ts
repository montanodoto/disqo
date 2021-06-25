import styled from 'styled-components';

const StyledButton = styled.button<{ margin?: string }>`
  border-radius: 20px;
  width: 150px;
  height: 30px;
  background: #1e88e5;
  color: #fff;
  border: 1px solid #1e88e5;
  cursor: pointer;
  transition: 0.1s all;
  margin: ${props => props.margin || 0};

  :active {
    background: #1976d2;
  }
  :disabled {
    border: 1px solid #bdbdbd;
    background: #bdbdbd;
  }
`;

export default StyledButton;
