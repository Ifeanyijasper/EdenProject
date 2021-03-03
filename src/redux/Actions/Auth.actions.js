import {SET_USER, SET_TOKEN, SET_PASSWORD, SET_USERNAME} from '../types';

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

export const setUserName = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  }
}

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  }
}