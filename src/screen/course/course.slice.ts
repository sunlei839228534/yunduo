import { createSlice } from "@reduxjs/toolkit"
import { Course } from "types/course"


export interface CourseState {
  visible: boolean,
  form: Course | undefined,
  formType: 'add' | 'edit' | undefined
}

const initialState: CourseState = {
  visible: false,
  form: undefined,
  formType: undefined
}

export const courseSlice = createSlice({
  name: 'courseSlice',
  initialState,
  reducers: {
    addCourse(state) {
      state.formType = 'add'
      state.visible = true
    },
    editCourse(state, { payload }) {
      state.formType = 'edit'
      state.form = payload
      state.visible = true
    },
    close(state) {
      state.visible = false
      state.form = undefined
      state.formType = undefined
    }
  },
})

export const { addCourse, editCourse, close } = courseSlice.actions

