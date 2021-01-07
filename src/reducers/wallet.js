// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE } from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      const expensesArray = state.expenses;
      return { ...state, wallet: { expenses: [expensesArray.concat(action.payload)] } };
    default:
      return state;
  }
};

export default wallet;
