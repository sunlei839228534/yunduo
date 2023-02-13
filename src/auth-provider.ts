import { AuthForm, RegisterForm, User } from "types/user"

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL
export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

export const login = (data: AuthForm) => {
  return fetch(`${apiUrl}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}

export const register = (data: RegisterForm) => {
  return fetch(`${apiUrl}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)