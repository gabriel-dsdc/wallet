import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';
import WalletTable from './WalletTable';
import { fetchExchangeRatesThunks } from '../actions';

class WalletExpenses extends React.Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  }

  initialState = { ...this.state }

  setToInitialState = () => {
    this.setState(this.initialState);
  }

  handleForm = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(fetchExchangeRatesThunks(this.state));
    this.setToInitialState();
  }

  currentValue = () => {
    const { expenses, editor, idToEdit } = this.props;

    if (editor === true) {
      this.setState({
        value: expenses.find((expense) => (expense.id === idToEdit))?.value,
        currency: expenses.find((expense) => (expense.id === idToEdit))?.currency,
        method: expenses.find((expense) => (expense.id === idToEdit))?.method,
        tag: expenses.find((expense) => (expense.id === idToEdit))?.tag,
        description: expenses.find((expense) => (expense.id === idToEdit))?.description,
      });
    }
  }

  render() {
    return (
      <>
        <WalletForm
          inputValues={ this.state }
          handleForm={ this.handleForm }
          handleSubmit={ this.handleSubmit }
          setToInitialState={ this.setToInitialState }
        />
        <WalletTable currentValue={ this.currentValue } />
      </>
    );
  }
}

WalletExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet: { expenses, editor, idToEdit } }) => ({
  expenses,
  editor,
  idToEdit,
});

export default connect(mapStateToProps)(WalletExpenses);
