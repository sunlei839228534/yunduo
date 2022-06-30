import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"
import { Course } from "types/course"

interface State {
  modalOpen: boolean,
  courseForm: Course | undefined
}

const initialState: State = {
  modalOpen: false,
  courseForm: undefined
}

export const courseSlice = createSlice({
  name: 'courseSlice',
  initialState,
  reducers: {
    openCourseModal(state) {
      console.log(state);
      state.modalOpen = true
    },
    closeCourseModal(state) {
      state.modalOpen = false
    },
    setCourse(state, action) {
      state.courseForm = action.payload
    }
  }
})

export const courseActions = courseSlice.actions

export const courseModalOpen = (state: RootState) => state.course.modalOpen

export const courseForm = (state: RootState) => state.course.courseForm