// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_WALLET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_CURRENCIES:
    return { ...state,
      currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
