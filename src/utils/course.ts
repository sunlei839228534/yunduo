import { useMutation, useQuery } from "react-query"
import { Course } from "types/course"
import { useHttp } from "./use-http"

export const useCreateCourse = () => {
  const http = useHttp()

  return useMutation<any, Error, Course, unknown>((data: Course) => http({
    url: '/course/create',
    method: 'POST',
    data,
  }))
}

export const useQueryCourse = () => {
  const http = useHttp()

  return useQuery('queryCourse', () => http({
    url: '/course/query',
    method: 'POST'
  }))
}