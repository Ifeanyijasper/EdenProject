import {SET_USER, SET_TOKEN} from '../types';

const INITIAL_STATE = {
  user: {},
  username: '',
  password: '',
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      const data = action.payload;
      return {...state, user: {...data.user}, username: data.username, password: data.password};
    case SET_TOKEN:
      const token = action.payload;
      return {...state, token};
    default:
      return state;
  }
};

export default AuthReducer;
