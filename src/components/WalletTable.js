import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class WalletTable extends React.Component {
  handleDelete = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(Number(id.split('--')[1])));
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            (
              { id, value, currency, method, tag, description,
                exchangeRates: { [currency]: { name, ask } } },
            ) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{Number(value * ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    id={ `delete-btn--${id}` }
                    onClick={ this.handleDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>);
  }
}

WalletTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(WalletTable);
