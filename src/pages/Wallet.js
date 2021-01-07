import React from 'react';
import Header from '../components/Header';
import NewExpenseForm from '../components/NewExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NewExpenseForm />
      </div>
    );
  }
}

export default Wallet;
