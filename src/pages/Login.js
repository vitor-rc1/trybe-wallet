import React from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: false,
      passwordIsValid: false,
      email: '',
    }
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
    this.changeState(regexEmail.test(value), 'emailIsValid')
  }

  passwordValidation(value) {
    this.changeState(value.length > 5, 'passwordIsValid')
  }

  render() {
    const { emailIsValid,  passwordIsValid, email } = this.state;
    const { getEmail, history } = this.props;

    return (
      <div>
        <label htmlFor="email-input">Email</label>
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
          value={ email }
          onChange={({ target: { value } }) => {
            this.setState({ email: value })
            this.emailValidation(value)
          }}
        />

        <label htmlFor="password-input">Senha</label>
        <input
          type="text"
          id="password-input"
          data-testid="password-input"
          onChange={({ target: {value} }) => this.passwordValidation(value)}
        />

        <button 
          disabled={ !passwordIsValid || !emailIsValid } 
          type="button"
          onClick={() => {
            getEmail( email );
            history.push('carteira');
          }}
        >
          Entrar
          </button>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(getEmail(email))
});

export default connect(null, mapDispatchToProps)(Login);
