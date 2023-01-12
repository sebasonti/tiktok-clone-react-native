import { AUTH_STATE_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  loaded: false
}

export function auth(state, { type, payload }) {
  if (!state) {
    state = initialState;
  }

  switch (type) {
    case AUTH_STATE_CHANGE:
      return {
        ...state,
        currentUser: payload.currentUser,
        loaded: payload.loaded
      };
    default:
      return state;
  }
}