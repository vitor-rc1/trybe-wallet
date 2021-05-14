// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, LOAD_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  nextId: 0,
  total: 0,
  editExpense: {}
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {...action.payload, id:state.nextId }],
      nextId: state.nextId + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => action.payload !== expense.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expense: [
        ...state.expenses.filter((expense) => action.payload.id !== expense.id),
        action.payload
      ],
    };
  case LOAD_EXPENSE:
    console.log(state.expenses.find(({id}) => id === action.payload))
    return {
      ...state,
      editExpense: state.expenses.find(({id}) => id === action.payload)
    };
  default:
    return state;
  }
};

export default wallet;
