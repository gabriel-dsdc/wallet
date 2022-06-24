import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWalletCurrencies } from '../actions';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  fetchApi = () => (
    fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json()).catch((error) => error)
  );

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const api = await this.fetchApi();
    const [first, , ...rest] = Object.keys(api);
    dispatch(addWalletCurrencies([first].concat(rest)));
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{0}</p>
        <p data-testid="header-currency-field">BRL</p>
        <WalletForm />
      </>);
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
