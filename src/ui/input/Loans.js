import React from 'react';
import Loan from './Loan';

class Loans extends React.Component {
  updateLoanRate(index, loan_rate) {
    if (loan_rate === "") {
      loan_rate = undefined;
    } else {
      loan_rate = parseFloat(loan_rate);
    }
    this.props.loan_rates[index] = loan_rate;
    this.props.setLoanRate(this.props.loan_rates);
  }

  updateLoanAmount(index, loan_amount) {
    if (loan_amount === "") {
      loan_amount = undefined;
    } else {
      loan_amount = this.props.parseDollar(loan_amount);
    }
    this.props.loan_amounts[index] = loan_amount;
    this.props.setLoanAmount(this.props.loan_amounts);
  }

  buildLoans() {
    const { loan_amounts, loan_rates } = this.props;
    return loan_amounts.map((amount, index) => this.buildLoan(amount, loan_rates[index], index));
  }

  buildLoan(loan_amount, loan_rate, index) {
    return (
      <li className="list-group-item" key={index}>
        <Loan
          loan_amount={loan_amount}
          loan_rate={loan_rate}
          updateLoanAmount={loan_amount => this.updateLoanAmount(index, loan_amount)}
          updateLoanRate={loan_rate => this.updateLoanRate(index, loan_rate)} />
      </li >
    );
  }

  add() {
    const { loan_amounts, loan_rates } = this.props;
    loan_amounts.push(undefined);
    loan_rates.push(undefined);
    this.props.setLoanAmount(loan_amounts);
    this.props.setLoanRate(loan_rates);
  }

  delete() {
    const { loan_amounts, loan_rates } = this.props;
    if (loan_amounts.length === 1) {
      return this.clear();
    }
    this.props.setLoanAmount(loan_amounts.slice(0, -1));
    this.props.setLoanRate(loan_rates.slice(0, -1));
  }

  clear() {
    this.props.setLoanAmount([undefined]);
    this.props.setLoanRate([undefined]);
  }

  render() {
    return (
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <div className="row text-center mb-3">
            <h5 className="col">
              Loan Balance and Interest Rate
            </h5>
          </div>
          <div className="row">
            <button type="button" className="col btn btn-outline-dark" onClick={() => this.add()}>Add</button>
            <button type="button" className="col btn btn-outline-dark" onClick={() => this.delete()}>Delete</button>
            <button type="button" className="col btn btn-outline-dark" onClick={() => this.clear()}>Clear</button>
          </div>
        </li>
        {this.buildLoans()}
      </ul>
    );
  }
}

export default Loans;