import { Navigate, RouteObject, useRoutes } from "react-router";
import { ClassScreen } from "screen/class";
import { CourseScreen } from "screen/course";
import { AddCourseScreen } from "screen/course/add-course";
import { ManageCourseScreen } from "screen/course/manage-course";
import { StudentScreen } from "screen/student";
import { AddStudentScreen } from "screen/student/add-student";
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
          element: <Navigate to={'add'} />
        },
        {
          path: 'add',
          element: <AddStudentScreen />
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
          element: <Navigate to={'add'} />
        },
        {
          path: 'add',
          element: <AddCourseScreen />
        },
        {
          path: 'manage',
          element: <ManageCourseScreen />
        }
      ]
    },
  ])
}
