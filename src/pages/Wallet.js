import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesNamesThunk } from '../actions';
import WalletExpenses from '../components/WalletExpenses';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesNamesThunk());
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
      <main className="wallet">
        <header>
          <h2>Wallet</h2>
          <div>
            <label htmlFor="email-field">
              Email:&nbsp;
              <p data-testid="email-field" id="email-field">{email}</p>
            </label>
            <label htmlFor="total-field">
              Despesa Total:&nbsp;
              <p
                data-testid="total-field"
                id="total-field"
              >
                {this.totalValue().toFixed(2)}
              </p>
              <p data-testid="header-currency-field">BRL</p>
            </label>
          </div>
        </header>
        <WalletExpenses />
      </main>);
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
