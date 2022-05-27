import { Navigate } from "react-router";
import { ClassScreen } from "screen/class";
import { CourseScreen } from "screen/course";
import { StudentScreen } from "screen/student";

export const routerConfig = [
  {
    path: '',
    element: <Navigate to={'/student'} />
  },
  {
    path: '/student',
    element: <StudentScreen />
  },
  {
    path: '/class',
    element: <ClassScreen />
  },
  {
    path: '/course',
    element: <CourseScreen />
  },
]