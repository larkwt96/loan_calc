import React from 'react';
import Loan from './Loan';

class Loans extends React.Component {
  updateLoanRate(index, loan_rate) {
    if (loan_rate === "") {
      loan_rate = undefined;
    } else {
      loan_rate = parseFloat(loan_rate);
    }
    this.props.loan_rate[index] = loan_rate;
    this.props.setLoanRate(this.props.loan_rate);
  }

  updateLoanAmount(index, loan_amount) {
    if (loan_amount === "") {
      loan_amount = undefined;
    } else {
      loan_amount = this.props.parseDollar(loan_amount);
    }
    this.props.loan_amount[index] = loan_amount;
    this.props.setLoanAmount(this.props.loan_amount);
  }

  buildLoans() {
    const { loan_amount, loan_rate } = this.props;
    return loan_amount.map((amount, index) => this.buildLoan(amount, loan_rate[index], index));
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
    const { loan_amount, loan_rate } = this.props;
    loan_amount.push(undefined);
    loan_rate.push(undefined);
    this.props.setLoanAmount(loan_amount);
    this.props.setLoanRate(loan_rate);
  }

  delete() {
    const { loan_amount, loan_rate } = this.props;
    if (loan_amount.length === 1) {
      return this.clear();
    }
    this.props.setLoanAmount(loan_amount.slice(0, -1));
    this.props.setLoanRate(loan_rate.slice(0, -1));
  }

  clear() {
    this.props.setLoanAmount([undefined]);
    this.props.setLoanRate([undefined]);
  }

  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item list-group-item-secondary">
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
  /*
render() {
return (
  <div className="card">
      <nav className="card-header">
        <div className="nav nav-tabs card-header-tabs" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
          <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
          <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="card-body">
          </div>
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="card-body">
            Loans
        </div>
        </div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <div className="card-body">
            Loans
        </div>
        </div>
      </div>
    </div >
    );
  }
  */
}

export default Loans;