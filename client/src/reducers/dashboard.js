import { DOORS_LOADED, CARDS_LOADED } from '../actions/types';

const initialState = {
  doors: [],
  cards: [],
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOORS_LOADED:
      return {
        ...state,
        doors: payload.data,
      };
    case CARDS_LOADED:
      return {
        ...state,
        cards: payload.data,
      };
    default:
      return state;
  }
}
