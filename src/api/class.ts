import { useMutation, useQuery } from "react-query"
import { Class } from "types/class"
import { useHttp } from "../utils/use-http"

export const useCreateClass = () => {
  const http = useHttp()
  return useMutation<any, Error, Class, unknown>((data: Class) => http({
    url: '/class/create',
    method: 'post',
    data
  }))
}

export const useQueryClass = () => {
  const http = useHttp()
  return useQuery(['queryClass'], () => http({
    url: '/class/query',
    method: 'post'
  }))
}