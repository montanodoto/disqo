import { BaseSyntheticEvent } from 'react';

export type ButtonProps = {
  text: string;
  onClick: (event: BaseSyntheticEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  margin?: string;
};
