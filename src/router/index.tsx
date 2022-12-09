import { Navigate, useRoutes } from "react-router";
import { ClassScreen } from "screen/class";
import { CourseScreen } from "screen/course";
import { ManageCourseScreen } from "screen/course/manage-course";
import { StudentScreen } from "screen/student";
import { ManageStudentScreen } from "screen/student/manage-student";


export const useElements = () => {
  return useRoutes([
    {
      path: '',
      element: <Navigate to={'/student'} />
    },
    {
      path: '/student',
      element: <StudentScreen />,
      children: [
        {
          path: '',
          element: <Navigate to={'manage'} />
        },
        {
          path: 'manage',
          element: <ManageStudentScreen />
        }
      ]
    },
    {
      path: '/class',
      element: <ClassScreen />
    },
    {
      path: '/course',
      element: <CourseScreen />,
      children: [
        {
          path: '',
          element: <Navigate to={'manage'} />
        },
        {
          path: 'manage',
          element: <ManageCourseScreen />
        }
      ]
    },
  ])
}
