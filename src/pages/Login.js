import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUserEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isSubmitDisabled: true,
  }

  handleEmail = ({ target: { value } }) => {
    this.setState({ email: value }, this.validFill);
  }

  handlePassword = ({ target: { value } }) => {
    this.setState({ password: value }, this.validFill);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(sendUserEmail(this.state));
    history.push('/carteira');
  }

  validFill = () => {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;

    if (email.includes('@')
    && email.endsWith('.com')
    && password.length >= MIN_PASSWORD_LENGTH) {
      this.setState({ isSubmitDisabled: false });
    } else {
      this.setState({ isSubmitDisabled: true });
    }
  }

  render() {
    const { email, password, isSubmitDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            id="email"
            type="email"
            value={ email }
            placeholder="email@example.com"
            onChange={ this.handleEmail }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid="password-input"
            id="password"
            type="password"
            value={ password }
            placeholder="mySecurePassword"
            onChange={ this.handlePassword }
          />
        </label>
        <button
          type="submit"
          disabled={ isSubmitDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
