import React from 'react';
import Header from '../components/Header';
import NewExpenseForm from '../components/NewExpenseForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NewExpenseForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
