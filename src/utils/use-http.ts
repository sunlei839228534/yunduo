import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useProvider } from 'context/provider'

const ERR_CODE = 200
const baseURL = process.env.REACT_APP_API_URL

const request = axios.create({
  baseURL
})


export const http = async (config: AxiosRequestConfig) => {
  try {
    const result = await request(config)
    if (result.status === ERR_CODE) {
      return result.data
    }
  } catch (e: any) {
    if (e instanceof AxiosError) {
      const errorInfo = e.response?.data.msg
      message.error(errorInfo)
      throw new Error(errorInfo)
    }
  }
}

export const useHttp = () => {
  const { user } = useProvider()

  return (config: AxiosRequestConfig) => http({
    ...config,
    auth: user?.token ? { username: user.token, password: '' } : undefined
  })
}