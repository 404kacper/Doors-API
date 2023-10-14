import api from '../utils/axiosProductionInterface';
import {} from './types';
import { setAlert } from './alert';

// Admin actions

// Assign card to a door
export const assignCard = (doorNumber, cardId) => async (dispatch) => {
  try {
    await api.put('/api/cards', {
      number: doorNumber,
      card: cardId,
    });
    dispatch(setAlert('Card successfully assigned.', 'success'));
  } catch (error) {
    if (error.response.data.error) {
      dispatch(setAlert(error.response.data.error, 'danger'));
    } else {
      dispatch(
        setAlert(
          'Undefined error encountered, check console for more information.',
          'danger'
        )
      );
    }
  }
};

export const createDoor = (doorNumber, managerId) => async (dispatch) => {
  try {
    await api.post('/api/doors', {
      number: doorNumber,
      manager: managerId,
    });
    dispatch(setAlert('Door successfully created. ', 'success'));
  } catch (error) {
    if (error.response.data.error) {
      dispatch(setAlert(error.response.data.error, 'danger'));
    } else {
      dispatch(
        setAlert(
          'Undefined error encountered, check console for more information.',
          'danger'
        )
      );
    }
  }
};

// Employee actions
export const createCard = (userId, status) => async (dispatch) => {
  try {
    await api.post('/api/cards', {
      user: userId,
      status: status,
    });
    dispatch(setAlert('Card successfully created. ', 'success'));
  } catch (error) {
    if (error.response.data.error) {
      dispatch(setAlert(error.response.data.error, 'danger'));
    } else {
      dispatch(
        setAlert(
          'Undefined error encountered, check console for more information.',
          'danger'
        )
      );
    }
  }
};
