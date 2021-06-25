import StyledButton from './styled';

import type { ButtonProps } from './types';

function Button({ text, onClick, disabled, type = 'button', ...props }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type} margin={props.margin}>
      {text}
    </StyledButton>
  );
}

export default Button;
