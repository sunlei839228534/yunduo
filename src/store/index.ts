import { configureStore } from "@reduxjs/toolkit"
import { classSlice } from "screen/class/class.slice"
import { courseSlice } from "screen/course/course.slice"
import { studentSlice } from "screen/student/student.slice"

export const rootReducer = {
  course: courseSlice.reducer,
  student: studentSlice.reducer,
  class: classSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
