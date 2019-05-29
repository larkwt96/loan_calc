import React from 'react';

class Loan extends React.Component {
  render() {
    const { loan_amount = "", loan_rate = "", updateLoanAmount, updateLoanRate } = this.props;
    return (
      <div className="form-group row">
        <div className="input-group col col-12 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input type="number" step=".01" className="form-control"
            placeholder="0" value={loan_amount}
            onChange={(event) => updateLoanAmount(event.currentTarget.value)} />
        </div>
        <div className="input-group col col-12 col-md-6">
          <input type="number" step=".01" className="form-control"
            placeholder="0" value={loan_rate}
            onChange={(event) => updateLoanRate(event.currentTarget.value)} />
          <div className="input-group-append">
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Loan;