import axios from 'axios';
import { DOORS_LOADED, CARDS_LOADED, CARD_STATUS_CHANGED } from './types';

// Load Doors
export const loadAllDoors = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/doors');

    dispatch({
      type: DOORS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Load Cards
export const loadGuestCards = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cards/me');

    dispatch({
      type: CARDS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Load Doors
export const loadAllManagedDoors = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/doors/me');

    dispatch({
      type: DOORS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Change Card Status
export const changeCardStatus = (card) => async (dispatch) => {
  let reverseStatus = card.status === 'lost' ? 'not lost' : 'lost';
  try {
    const res = await axios.put(`/api/cards/${card._id}`, {
      status: reverseStatus,
    });

    dispatch({
      type: CARD_STATUS_CHANGED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
