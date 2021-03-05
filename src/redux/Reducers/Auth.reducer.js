import {SET_USER, SET_TOKEN, SET_PASSWORD, SET_USERNAME, RESET_USER} from '../types';

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
    case SET_PASSWORD: 
      const password = action.payload;
      return {...state, password};
    case SET_USERNAME:
      const username = action.payload;
      return {...state, username, user: {...state.user, username}};
    case RESET_USER: 
      return {...state, username:'', password:'', user: {}}
    default:
      return state;
  }
};

export default AuthReducer;
