import { BaseSyntheticEvent, ReactNode } from 'react';

export type InputProps = {
  value: string;
  onChange: (event: BaseSyntheticEvent) => void;
  placeholder?: string;
  id?: string;
  label?: string;
  type?: string;
  margin?: string;
  width?: string;
  height?: string;
  icon?: ReactNode;
  name?: string;
  wrapperStyles?: string;
};

export type StyledInputWrapperProps = { width?: string; height?: string; wrapperStyles?: string };

export type StyledWrapperProps = { margin: string };
