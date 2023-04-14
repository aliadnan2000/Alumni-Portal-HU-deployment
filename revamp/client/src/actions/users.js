import * as api from '../api';
import { FETCH_USER } from '../constants/actionTypes';

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserById(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log("Error:", error.message);
    console.log("Error details:", error);

  }
};