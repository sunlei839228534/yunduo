import { useEffect } from "react"
import { useHttp } from "utils/use-http"

export const StudentScreen = () => {
  const http = useHttp()
  useEffect(() => {
    http({
      method: 'post',
      url: '/student/create',
      data: {
        name: "喜羊羊",
        nickname: "阿喜"
      }
    }).then(res => {
      console.log(res);
    })
  }, [])
  return (
    <div>
      student
    </div>
  )
}