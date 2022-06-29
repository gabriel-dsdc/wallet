// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_EXPENSE,
  ADD_WALLET_CURRENCIES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  TOGGLE_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_CURRENCIES:
    return { ...state,
      currencies: action.payload };
  case ADD_EXPENSE: {
    const { expenses } = state;
    const prevId = expenses[expenses.length - 1]?.id;
    return { ...state,
      expenses: [...expenses,
        {
          id: prevId || prevId === 0 ? prevId + 1 : 0,
          ...action.payload,
        },
      ],
    };
  }
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE: {
    const { expenses } = state;
    const { payload: { editExpenseId, editedExpense } } = action;

    return { ...state,
      expenses: expenses.map((expense) => (
        expense.id === editExpenseId
          ? { ...expense, ...editedExpense, exchangeRates: expense.exchangeRates }
          : expense)),
    };
  }
  case TOGGLE_EDITING:
    return { ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
