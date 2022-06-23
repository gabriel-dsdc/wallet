// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SEND_USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_EMAIL:
    return { ...state,
      email: action.payload.email };
  default:
    return state;
  }
};

export default userReducer;
