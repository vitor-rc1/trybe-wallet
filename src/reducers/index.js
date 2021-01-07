// import user from './user';
import user from './user';
// import wallet from './wallet';
import wallet from './wallet';
// Configure os seus reducers.
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user,
  wallet,
})

export default reducers;

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
