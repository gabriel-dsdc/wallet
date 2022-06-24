import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user: { email } } = this.props;
    return (
      <>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{0}</p>
        <p data-testid="header-currency-field">BRL</p>
      </>);
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Wallet);
