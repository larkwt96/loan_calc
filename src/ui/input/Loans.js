import React from 'react';
import Loan from './Loan';

class Loans extends React.Component {
  updateLoanRate(loan_rate) {
    if (loan_rate === "") {
      loan_rate = undefined;
    } else {
      loan_rate = [parseFloat(loan_rate)];
    }
    this.props.setLoanRate(loan_rate);
  }

  updateLoanAmount(loan_amount) {
    if (loan_amount === "") {
      loan_amount = undefined;
    } else {
      loan_amount = [this.props.parseDollar(loan_amount)];
    }
    this.props.setLoanAmount(loan_amount);
  }

  renderTabHeaders() {

  }

  renderTabBodies() {

  }

  render() {
    const { loan_amount, loan_rate } = this.props;
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
              <Loan
                loan_amount={loan_amount}
                loan_rate={loan_rate}
                updateLoanAmount={loan_amount => this.updateLoanAmount(loan_amount)}
                updateLoanRate={loan_rate => this.updateLoanRate(loan_rate)} />
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
}

export default Loans;