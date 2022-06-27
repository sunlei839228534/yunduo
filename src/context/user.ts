import { User } from "types/user";

export enum UserActionKind {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}
export interface UserAction {
  type: UserActionKind,
  paylod: User | null
}

export interface UserState {
  user: User | null
}

export function UserReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case UserActionKind.LOGIN:
      return {
        ...state,
        user: action.paylod
      }
    case UserActionKind.LOGOUT:
      return {
        ...state,
        user: action.paylod
      }

    default:
      return state;
  }
}
