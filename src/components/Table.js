import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  itemTable(item) {
    const { value, currency, exchangeRates, method, id, tag, description } = item;
    const { name, ask } = exchangeRates[currency];
    const { deleteItem } = this.props;
    return (
      <tr key={ id }>
        <th role="cell">{description}</th>
        <th role="cell">{tag}</th>
        <th role="cell">{method}</th>
        <th role="cell">{value}</th>
        <th role="cell">{name}</th>
        <th role="cell">{Math.round(ask * 100) / 100}</th>
        <th role="cell">{Math.round(ask * value * 100) / 100}</th>
        <th role="cell">Real</th>
        <th>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteItem(id) }
          >
            Excluir
          </button>
        </th>
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
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func.isRequired,
};
