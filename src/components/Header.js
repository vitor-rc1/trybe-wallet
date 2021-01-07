import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  componentDidUpdate() {
    this.updateTotal();
  }

  updateTotal() {
    const { total } = this.state;
    const { expenses } = this.props;
    const totalConverted = expenses.reduce((acc, crr) => {
      const { value, currency, exchangeRates } = crr;
      return acc + value * exchangeRates[currency].ask;
    }, 0);
    if (total !== totalConverted) {
      this.setState({ total: totalConverted });
    }
  }

  render() {
    const { userEmail } = this.props;
    const { total, currency } = this.state;
    return (
      <div className="header-component">
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{ total }</span>
        <span data-testid="header-currency-field">{ currency }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
