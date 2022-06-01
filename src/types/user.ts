export interface User {
  token: string,
  user: {
    nickname: string,
    email: string
  }
}

export interface AuthForm {
  email: string,
  password: string
}

export interface RegisterForm {
  email: string,
  password1: string,
  password2: string,
  nickname: string,
}