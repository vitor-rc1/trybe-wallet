import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencys } from '../actions';

class NewExpenseForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: props.idStore,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      codes: [],
    };
    this.updateState = this.updateState.bind(this);
    this.loadCurrencys = this.loadCurrencys.bind(this);
    this.insertExpense = this.insertExpense.bind(this);
    this.updateiD = this.updateiD.bind(this);
  }

  componentDidMount() {
    this.loadCurrencys();
  }

  componentDidUpdate() {
    this.updateiD();
  }

  updateiD() {
    const { id } = this.state;
    const { idStore } = this.props;
    if (id !== idStore) {
      this.setState({
        id: idStore,
      });
    }
  }

  async loadCurrencys() {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    delete exchangeRates.USDT; // delete retirado da w3schools
    // https://www.w3schools.com/howto/howto_js_remove_property_object.asp
    const codes = Object.keys(exchangeRates);
    this.setState({ codes });
  }

  updateState(name, value) {
    this.setState({ [name]: value });
  }

  currencysOptions() {
    const { codes } = this.state;
    return codes.map((code) => (
      <option
        value={ code }
        key={ code }
        data-testid={ code }
      >
        { code}
      </option>
    ));
  }

  async insertExpense(event) {
    event.preventDefault();

    const expense = { ...this.state };
    const { addExpenseProp } = this.props;
    delete expense.codes;
    addExpenseProp(expense);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="new-expense-component" onSubmit={ this.insertExpense }>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            id="value-input"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ ({ target }) => {
              this.updateState(target.name, target.value);
            } }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ ({ target }) => {
              this.updateState(target.name, target.value);
            } }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ ({ target }) => {
              this.updateState(target.name, target.value);
            } }
          >
            {this.currencysOptions()}
          </select>
        </label>

        <label htmlFor="method-input">
          Método:
          <select
            type="text"
            id="method-input"
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ ({ target }) => {
              this.updateState(target.name, target.value);
            } }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            type="text"
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ ({ target }) => {
              this.updateState(target.name, target.value);
            } }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (expense) => dispatch(fetchCurrencys(expense)),
});

const mapStateToProps = (state) => ({
  idStore: state.wallet.expenses.length,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);

NewExpenseForm.propTypes = {
  idStore: PropTypes.number.isRequired,
  addExpenseProp: PropTypes.func.isRequired,
};
