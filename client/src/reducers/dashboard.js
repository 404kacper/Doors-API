import { DOORS_LOADED } from '../actions/types';

const initialState = {
  doors: [],
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOORS_LOADED:
      return {
        ...state,
        doors: payload.data,
      };
    default:
      return state;
  }
}
