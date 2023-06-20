import axios from 'axios';
import {} from './types';
import { setAlert } from './alert';

// Admin actions

// Assign card to a door
export const assignCard = (doorNumber, cardId) => async (dispatch) => {
  try {
    await axios.put('/api/cards', {
      number: doorNumber,
      card: cardId,
    });
    dispatch(setAlert('Card successfully assigned', 'success'));
  } catch (error) {
    if (error.response.data.error) {
      dispatch(setAlert(error.response.data.error, 'danger'));
    } else {
      dispatch(
        setAlert(
          'Undefined error encountered, check console for more information',
          'danger'
        )
      );
      console.error(error);
    }
  }
};

// Employee actions
