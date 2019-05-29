import React from 'react';

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
      <React.Fragment>
        <div className="form-group">
          <label>Loan Balance</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={loan_amount}
              onChange={(event) => this.updateLoanAmount(event.currentTarget.value)} />
          </div>
          {/*<small className="form-text text-muted">Input loan amount (in dollars).</small>*/}
        </div>

        <div className="form-group">
          <label>Loan Interest Rate (%)</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={loan_rate}
              onChange={(event) => this.updateLoanRate(event.currentTarget.value)} />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
          {/*<small className="form-text text-muted">Input loan rate (in percentage).</small>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default Loans;