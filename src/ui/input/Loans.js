import React from 'react';
import Loan from './Loan';

class Loans extends React.Component {
  updateLoanRate(loan_rate) {
    if (loan_rate === "") {
      loan_rate = undefined;
    } else {
      loan_rate = parseFloat(loan_rate);
    }
    this.props.setLoanRate(loan_rate);
  }

  updateLoanAmount(loan_amount) {
    this.props.setLoanAmount(this.props.parseDollar(loan_amount))
  }

  render() {
    const { loan_amount, loan_rate } = this.props;
    return (
      <Loan
        loan_amount={loan_amount}
        loan_rate={loan_rate}
        updateLoanAmount={loan_amount => this.updateLoanAmount(loan_amount)}
        updateLoanRate={loan_rate => this.updateLoanRate(loan_rate)} />
    );
  }
}

export default Loans;