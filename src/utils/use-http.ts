import axios, { AxiosRequestConfig } from 'axios'
import { useAuth } from 'context/auth'

const ERR_CODE = 200
const baseURL = process.env.REACT_APP_API_URL

const request = axios.create({
  baseURL
})


export const http = async (config: AxiosRequestConfig) => {
  const result = await request(config)
  if (result.status === ERR_CODE) {
    return result.data
  }
}

export const useHttp = () => {
  const { user } = useAuth()
  console.log(user);

  return (config: AxiosRequestConfig) => http({
    ...config,
    auth: user?.token ? { username: user.token, password: '' } : undefined
  })
}