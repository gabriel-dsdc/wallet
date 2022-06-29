// Coloque aqui suas actions

import getCurrencies from '../services/currenciesApi';

export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';
export const ADD_WALLET_CURRENCIES = 'ADD_WALLET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';

export const sendUserEmail = (userEmail) => ({
  type: SEND_USER_EMAIL,
  payload: { ...userEmail },
});

export const addWalletCurrencies = (walletCurrencies) => ({
  type: ADD_WALLET_CURRENCIES,
  payload: [...walletCurrencies],
});

export const fetchCurrenciesNamesThunk = () => (dispatch) => {
  getCurrencies().then((api) => {
    const [first, , ...rest] = Object.keys(api);
    dispatch(addWalletCurrencies([first].concat(rest)));
  });
};

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: { ...expense },
});

export const fetchExchangeRatesThunks = (localState) => (dispatch) => {
  getCurrencies().then((api) => {
    dispatch(addExpense({
      ...localState,
      exchangeRates: api,
    }));
  });
};

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

export const editExpense = (editExpenseId, editedExpense) => ({
  type: EDIT_EXPENSE,
  payload: { ...{ editExpenseId, editedExpense } },
});

export const toggleEditing = (toggleObject) => ({
  type: TOGGLE_EDITING,
  payload: { ...toggleObject },
});
