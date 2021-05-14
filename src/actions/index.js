// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const fetchCurrencys = (infos) => async (dispatch) => {
  const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  delete exchangeRates.USDT;
  dispatch(addExpense({ ...infos, exchangeRates }));
};

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (expenseEdited) => ({
  type: EDIT_EXPENSE,
  payload: expenseEdited,
});

export const LOAD_EXPENSE = 'LOAD_EXPENSE';

export const loadExpense = (id) => ({
  type: LOAD_EXPENSE,
  payload: id,
});
