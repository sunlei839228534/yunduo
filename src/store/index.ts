import { configureStore } from "@reduxjs/toolkit"
import { courseSlice } from "screen/course/course.slice"

export const rootReducer = {
  course: courseSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
