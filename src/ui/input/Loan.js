import React from 'react';

class Loan extends React.Component {
  render() {
    const { loan_amount = "", loan_rate = "", updateLoanAmount, updateLoanRate } = this.props;
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
              onChange={(event) => updateLoanAmount(event.currentTarget.value)} />
          </div>
          {/*<small className="form-text text-muted">Input loan amount (in dollars).</small>*/}
        </div>

        <div className="form-group">
          <label>Loan Interest Rate (%)</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={loan_rate}
              onChange={(event) => updateLoanRate(event.currentTarget.value)} />
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

export default Loan;