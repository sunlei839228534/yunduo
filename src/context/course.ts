export enum CourseActionKind {
  TOGGLE = 'TOGGLE'
}

export interface CourseAction {
  type: CourseActionKind,
}

export interface CourseState {
  showModal: boolean
}

export function CourseReducer(state: CourseState, action: CourseAction) {
  switch (action.type) {
    case CourseActionKind.TOGGLE: {
      return {
        ...state,
        showModal: !state.showModal
      }
    }
    default: {
      return state
    }
  }
}