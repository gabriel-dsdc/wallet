import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class WalletForm extends React.Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  }

  initialState = { ...this.state }

  handleForm = ({ target: { id, value } }) => {
    switch (id) {
    case 'value-input':
      this.setState({ value });
      break;
    case 'description-input':
      this.setState({ description: value });
      break;
    case 'currency-input':
      this.setState({ currency: value });
      break;
    case 'method-input':
      this.setState({ method: value });
      break;
    case 'tag-input':
      this.setState({ tag: value });
      break;
    default:
      break;
    }
  }

  fetchAPI = () => (
    fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json()).catch((error) => (error))
  )

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const api = await this.fetchAPI();

    dispatch(addExpense({
      ...this.state,
      exchangeRates: api,
    }));

    this.setState(this.initialState);
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
            value={ value }
            onChange={ this.handleForm }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select id="currency-input" value={ currency } onChange={ this.handleForm }>
            {currencies.map((currencyName) => (
              <option key={ currencyName } value={ currencyName }>{currencyName}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select
            data-testid="method-input"
            id="method-input"
            value={ method }
            onChange={ this.handleForm }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            onChange={ this.handleForm }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            value={ description }
            onChange={ this.handleForm }
          />
        </label>
        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>);
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(WalletForm);
