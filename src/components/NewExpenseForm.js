import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { response } from '../tests/mockData';

class NewExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.updateState = this.updateState.bind(this);
    this.loadCurrencys = this.loadCurrencys.bind(this);
    this.currencysOptions = this.currencysOptions.bind(this);
  }

  updateState(name, value) {
    this.setState({ [name]: value });
  }

   currencysOptions() {
    const { exchangeRates } = this.state;
    const codes = Object.keys(exchangeRates);
    return codes.map((code) => {
      return (
        <option
          value={code}
          key={code}
          data-testid={code}
        >
          { code }
        </option>
      );
    });
  }

  async loadCurrencys() {
    let exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then(response => response.json());
    delete exchangeRates.USDT; //delete retirado da w3schools 
    //https://www.w3schools.com/howto/howto_js_remove_property_object.asp
    this.setState({ exchangeRates });
  }

  componentDidMount() {
    this.loadCurrencys();
  }

  insertExpense(event) {
    event.preventDefault();

    //terminar função
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
            value={value}
            name="value"
            onChange={({ target: { name, value } }) => { this.updateState(name, value) }}
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            value={description}
            name="description"
            onChange={({ target: { name, value } }) => { this.updateState(name, value) }}
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
            value={currency}
            name="currency"
            onChange={({ target: { name, value } }) => { this.updateState(name, value) }}
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
            value={method}
            name="method"
            onChange={({ target: { name, value } }) => { this.updateState(name, value) }}
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
            value={tag}
            name="tag"
            onChange={({ target: { name, value } }) => { this.updateState(name, value) }}
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
  addExpense: (expense) => dispatch()
})

export default connect(null, mapDispatchToProps)(NewExpenseForm);
