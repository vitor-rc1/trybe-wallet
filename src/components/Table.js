import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteExpense, loadExpense } from '../actions';

class Table extends React.Component {
  itemTable(item) {
    const { value, currency, exchangeRates, method, id, tag, description } = item;
    const { name, ask } = exchangeRates[currency];
    const { deleteItem, loadExpenseProp } = this.props;
    return (
      <tr key={ id }>
        <td role="cell">{description}</td>
        <td role="cell">{tag}</td>
        <td role="cell">{method}</td>
        <td role="cell">{value}</td>
        <td role="cell">{name}</td>
        <td role="cell">{Math.round(ask * 100) / 100}</td>
        <td role="cell">{Math.round(ask * value * 100) / 100}</td>
        <td role="cell">Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteItem(id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={() => loadExpenseProp(id)}
          >
            Editar
            </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-component">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => this.itemTable(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  loadedExpense: state.wallet.editExpense
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteExpense(id)),
  loadExpenseProp: (id) => dispatch(loadExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func.isRequired,
  loadExpense: PropTypes.func.isRequired,
};
