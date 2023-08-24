export interface LoginForm {
  email: string;
  password: string;
  [key: string]: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  ethAddress: string;
  [key: string]: string;
}
