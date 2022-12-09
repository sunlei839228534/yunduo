import { createSlice } from "@reduxjs/toolkit"
import { Student } from "types/student"

export interface StudentState {
  visible: boolean,
  form: Student | undefined,
  formType: 'add' | 'edit' | undefined
}

const initialState: StudentState = {
  visible: false,
  form: undefined,
  formType: undefined
}

export const studentSlice = createSlice({
  name: 'studentSlice',
  initialState,
  reducers: {
    addStudent(state) {
      state.formType = 'add'
      state.visible = true
    },
    editStudent(state, { payload }) {
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

export const { addStudent, editStudent, close } = studentSlice.actions


