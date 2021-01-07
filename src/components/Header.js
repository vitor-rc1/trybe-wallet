import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }
  render() {
    const { email } = this.props
    const { total, currency } = this.state
    return (
      <div className="header-component">
        <span data-testid='email-field'>{ email }</span>
        <span data-testid='total-field'>{ total }</span>
        <span data-testid='header-currency-field'>{ currency }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);