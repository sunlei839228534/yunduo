import { useQuery } from "react-query"
import { useHttp } from "utils/use-http"


export const useQueryTeacher = () => {
  const http = useHttp()
  return useQuery(['queryTeacher'], () => http({
    url: '/user/query',
    method: 'get'
  }))
}