import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWalletCurrencies } from '../actions';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

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

  totalValue = () => {
    const { expenses } = this.props;

    return expenses.reduce(
      (acc, { value, currency, exchangeRates: { [currency]: { ask } } }) => (
        acc + value * ask
      ), 0,
    );
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <h1>TrybeWallet</h1>
        <label htmlFor="email-field">
          Email:&nbsp;
          <p data-testid="email-field" id="email-field">{email}</p>
        </label>
        <label htmlFor="total-field">
          Despesa Total:
          <p data-testid="total-field" id="total-field">{this.totalValue().toFixed(2)}</p>
        </label>
        <p data-testid="header-currency-field">BRL</p>
        <WalletForm />
        <WalletTable />
      </>);
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Wallet);
