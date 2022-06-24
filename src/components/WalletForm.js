import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input data-testid="value-input" id="value-input" type="number" />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input data-testid="description-input" id="description-input" type="text" />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select id="currency-input">
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select data-testid="method-input" id="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>);
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
