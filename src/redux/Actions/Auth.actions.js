import {SET_USER, SET_TOKEN} from '../types';

export const setUser = (user, username, password) => {
  return {
    type: SET_USER,
    payload: {user, username, password},
  };
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};