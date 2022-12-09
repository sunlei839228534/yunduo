import { useMutation, useQuery, useQueryClient } from "react-query"
import { Course } from "types/course"
import { useHttp } from "./use-http"

export const useQueryCourse = () => {
  const http = useHttp()
  return useQuery(['queryCourse'], () => http({
    url: '/course/query',
    method: 'post'
  }))
}
export const useCreateCourse = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation<any, Error, Course, unknown>((data: Course) => http({
    url: '/course/create',
    method: 'post',
    data,
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryCourse')
  })
}


export const useCourseDelete = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation((id: number) => http({
    method: 'DELETE',
    url: `/course/${id}`
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryCourse')
  })
}

export const useCourseUpdate = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation(({ record, id }: { record: Course, id: number }) => http({
    method: 'PUT',
    url: `/course/${id}`,
    data: record
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryCourse')
  })
}