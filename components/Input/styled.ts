import styled from 'styled-components';

import type { StyledWrapperProps, StyledInputWrapperProps } from './types';

const StyledInputWrapper = styled.div<StyledInputWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    border-radius: 20px;
    min-width: ${props => props.width || '200px'};
    height: ${props => props.height || '30px'};
    border: 2px solid #d4d4d4;
    padding: 2px 25px 2px 10px;
  }

  textarea {
    border-radius: 20px;
    border: 2px solid #d4d4d4;
    width: ${props => props.width || '400px'};
    height: 100px;
    font-size: 16px;
    padding: 1rem;
  }

  svg {
    position: relative;
    right: 25px;
  }
`;

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${(props: any) => props.margin || '0'};

  label {
    padding-left: 5px;
    font-size: 14px;
  }
`;

export { StyledInputWrapper, StyledWrapper };
