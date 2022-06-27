// Coloque aqui suas actions

export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';
export const ADD_WALLET_CURRENCIES = 'ADD_WALLET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const sendUserEmail = (userEmail) => ({
  type: SEND_USER_EMAIL,
  payload: { ...userEmail },
});

export const addWalletCurrencies = (walletCurrencies) => ({
  type: ADD_WALLET_CURRENCIES,
  payload: [...walletCurrencies],
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: { ...expense },
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});
