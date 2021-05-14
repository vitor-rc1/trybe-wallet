import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencys, editExpense } from '../actions';

class NewExpenseForm extends React.Component {
  constructor(props) {
    super();

    // const { value, description, currency, method, tag } = props.editExpense

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      codes: [],
    };
    this.updateState = this.updateState.bind(this);
    this.loadCurrencys = this.loadCurrencys.bind(this);
    this.insertExpense = this.insertExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.loadExpenseToState = this.loadExpenseToState.bind(this);
  }

  componentDidMount() {
    this.loadCurrencys();
  }

  componentDidUpdate() {
    this.loadExpenseToState()
  }

  loadExpenseToState() {
    const { editExpense } = this.props
    console.log(editExpense)
    if(Object.keys(editExpense).length) {
      // this.setState({ ...editExpense })
      console.log('c')
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
        { code }
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

  editExpense(){
    const { editExpense } = this.props;
    this.setState({

    })
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
  id: state.wallet.nextId,
  editExpense: state.wallet.editExpense,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);

NewExpenseForm.propTypes = {
  id: PropTypes.number,
  addExpenseProp: PropTypes.func.isRequired,
};

NewExpenseForm.defaultProps = {
  id: 0,
};
