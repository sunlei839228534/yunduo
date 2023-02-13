import { createSlice } from "@reduxjs/toolkit"
import { Class } from "types/class"


export interface ClassState {
  visible: boolean,
}

const initialState: ClassState = {
  visible: false,
}

export const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {
    modalOpen(state) {
      state.visible = true
    },
    modalClose(state) {
      state.visible = false
    }
  },
})

export const { modalOpen, modalClose } = classSlice.actions