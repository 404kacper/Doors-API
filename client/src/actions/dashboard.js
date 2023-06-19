import axios from 'axios';
import {
  DOORS_LOADED,
  CARDS_LOADED,
  USERS_LOADED,
  CARD_STATUS_CHANGED,
} from './types';

// Guest actions - should get a different file same for employee and admin

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

// Employee actions 

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

// Admin actions 

// Load Users
export const loadAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users`);

    dispatch({
      type: USERS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Load Cards
export const loadAllCards = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cards`);

    dispatch({
      type: CARDS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
