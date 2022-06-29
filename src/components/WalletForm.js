import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, toggleEditing } from '../actions';

class WalletForm extends React.Component {
  handleEdit = (event) => {
    event.preventDefault();
    const { dispatch, idToEdit, inputValues, setToInitialState } = this.props;

    dispatch(editExpense(idToEdit, {
      ...inputValues,
    }));

    dispatch(toggleEditing({
      editor: false,
    }));

    setToInitialState();
  }

  render() {
    const { currencies, editor, handleForm, handleSubmit,
      inputValues: { value, currency, method, tag, description } } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            data-testid="value-input"
            id="value-input"
            name="value"
            type="number"
            value={ value }
            onChange={ handleForm }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleForm }
          >
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
            name="method"
            value={ method }
            onChange={ handleForm }
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
            name="tag"
            value={ tag }
            onChange={ handleForm }
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
            name="description"
            type="text"
            value={ description }
            onChange={ handleForm }
          />
        </label>
        {editor ? (
          <button type="submit" onClick={ this.handleEdit }>Editar despesa</button>
        ) : (
          <button type="submit" onClick={ handleSubmit }>Adicionar despesa</button>
        )}
      </form>);
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  handleForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputValues: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  setToInitialState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { currencies, editor, idToEdit } }) => ({
  currencies,
  editor,
  idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
