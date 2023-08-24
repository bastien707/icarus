export type ButtonType = 'login' | 'logout' | 'register';

export interface MainButtonProps {
  text: string;
  clickHandler?: () => void;
  disabled?: boolean;
  color?: string;
  margin?: string;
}

export interface NavButtonProps {
  type?: ButtonType;
  link?: string;
}
