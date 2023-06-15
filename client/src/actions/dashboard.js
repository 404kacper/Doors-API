import axios from 'axios';
import { DOORS_LOADED, CARDS_LOADED } from './types';

// Load Doors
export const loadDoors = () => async (dispatch) => {
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
export const loadCards = () => async (dispatch) => {
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
