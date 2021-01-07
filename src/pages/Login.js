import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: false,
      passwordIsValid: false,
      email: '',
    };
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(state, item) {
    if (state) {
      this.setState({ [item]: true });
    } else {
      this.setState({ [item]: false });
    }
  }

  emailValidation(value) {
    // regex que utilizei graças a colaboração do Amigo Pedro MF - Turma 7
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    this.changeState(regexEmail.test(value), 'emailIsValid');
  }

  passwordValidation(value) {
    const minLength = 5;
    this.changeState(value.length > minLength, 'passwordIsValid');
  }

  render() {
    const { emailIsValid, passwordIsValid, email } = this.state;
    const { getEmailProps, history } = this.props;

    return (
      <div>
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target: { value } }) => {
              this.setState({ email: value });
              this.emailValidation(value);
            } }
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            type="text"
            id="password-input"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => this.passwordValidation(value) }
          />
        </label>

        <button
          disabled={ !passwordIsValid || !emailIsValid }
          type="button"
          onClick={ () => {
            getEmailProps(email);
            history.push('carteira');
          } }
        >
          Entrar
        </button>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmailProps: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getEmailProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
