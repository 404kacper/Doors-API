import {
  DOORS_LOADED,
  CARDS_LOADED,
  CARD_STATUS_CHANGED,
  USERS_LOADED,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = {
  doors: [],
  cards: [],
  users: [],
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
    case USERS_LOADED:
      return {
        ...state,
        users: payload.data,
      };
    case CARD_STATUS_CHANGED:
      // Matches card from request with the one in state by comparing ids
      // Replaces all matching card objects with the updated one from database
      return {
        ...state,
        doors: state.doors.map((door) => {
          return {
            ...door,
            cards: door.cards.map((card) => {
              return card._id === payload.data._id ? payload.data : card;
            }),
          };
        }),
      };
    // Clean states when switching users
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        doors: [],
        cards: [],
        users: [],
      };
    default:
      return state;
  }
}
