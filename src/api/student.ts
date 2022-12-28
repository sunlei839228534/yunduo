import { useMutation, useQuery, useQueryClient } from "react-query"
import { Student } from "types/student"
import { useHttp } from "utils/use-http"


export const useQueryStudent = () => {
  const http = useHttp()
  return useQuery(['queryStudent'], () => http({
    url: '/student/query',
    method: 'post'
  }))
}

export const useCreateStudent = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation<any, Error, Student, unknown>((data: Student) => http({
    url: '/student/create',
    method: 'post',
    data
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryStudent')
  })
}

export const useStudentDelete = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation((id: number) => http({
    method: 'DELETE',
    url: `/student/${id}`
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryStudent')
  })
}

export const useStudentUpdate = () => {
  const http = useHttp()
  const queryClient = useQueryClient()

  return useMutation(({ record, id }: { record: Student, id: number }) => http({
    method: 'PUT',
    url: `/student/${id}`,
    data: record
  }), {
    onSuccess: () => queryClient.invalidateQueries('queryStudent')
  })
}