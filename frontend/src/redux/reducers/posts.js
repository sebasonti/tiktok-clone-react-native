import { CURRENT_USER_POSTS_UPDATE } from "../constants";

const initialState = {
  currentUserPosts: null,
}

export function posts(state, { type, payload }) {
  if (!state) {
    state = initialState;
  }

  switch (type) {
    case CURRENT_USER_POSTS_UPDATE:
      return {
        ...state,
        currentUserPosts: payload.posts,
      };
    default:
      return state;
  }
}