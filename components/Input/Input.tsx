import { StyledInputWrapper, StyledWrapper } from './styled';

import type { InputProps } from './types';

function Input({
  value,
  onChange,
  placeholder,
  id,
  label,
  type = 'input',
  icon,
  name,
  ...props
}: InputProps) {
  return (
    <StyledWrapper margin={props.margin}>
      {label && <label htmlFor={id}>{label}</label>}
      <StyledInputWrapper width={props.width} height={props.height}>
        {type === 'input' && (
          <input name={name} id={id} value={value} onChange={onChange} placeholder={placeholder} />
        )}
        {type === 'textarea' && (
          <textarea
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
        {icon}
      </StyledInputWrapper>
    </StyledWrapper>
  );
}

export default Input;
