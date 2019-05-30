import React from 'react';
import Model from '../../model/Model';
import Loans from './Loans';

class Input extends React.Component {
  defaultDownPayment = 0;
  defaultMinimumPayment = 50;
  defaultLoanTerm = 120;
  state = {
    loan_amounts: [undefined],
    loan_rates: [undefined],
    down_payment: undefined,
    minimum_payment: undefined,
    loan_term: undefined,
  };

  parseDollar(amount) {
    if (amount === "") {
      return undefined;
    } else {
      return Math.floor(parseFloat(amount) * 100) / 100;
    }
  }

  setLoanTerm(value) {
    if (value === "") {
      value = undefined;
    } else {
      value = parseInt(value);
    }
    this.setState({ loan_term: value });
  }

  calculate(event) {
    event.preventDefault();
    const { loan_amounts, loan_rates,
      down_payment = this.defaultDownPayment,
      minimum_payment = this.defaultMinimumPayment,
      loan_term = this.defaultLoanTerm } = this.state;
    const model = new Model({
      loan_amounts: loan_amounts.map((e = 0) => e),
      loan_rates: loan_rates.map((e = 0) => e),
      down_payment, minimum_payment, loan_term
    });
    Promise.resolve().then(() => {
      this.props.displayResults(model.run());
    });
  }

  body() {
    const { loan_amounts, loan_rates,
      down_payment = "",
      minimum_payment = "",
      loan_term = "" } = this.state;
    return (
      <React.Fragment>
        <Loans
          loan_amounts={loan_amounts}
          loan_rates={loan_rates}
          parseDollar={this.parseDollar}
          setLoanRate={(loan_rates) => this.setState({ loan_rates })}
          setLoanAmount={(loan_amounts) => this.setState({ loan_amounts })} />
        <div className="form-group">
          <label>Down Payment</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder={this.defaultDownPayment} value={down_payment}
              onChange={({ currentTarget: { value } }) => this.setState({ down_payment: this.parseDollar(value) })} />
          </div>
          {/*<small className="form-text text-muted">Amount payed upfront (in dollars).</small>*/}
        </div>

        <div className="form-group">
          <label>Minimum Monthly Payment</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder={this.defaultMinimumPayment} value={minimum_payment}
              onChange={({ currentTarget: { value } }) => this.setState({ minimum_payment: this.parseDollar(value) })} />
          </div>
          {/*<small className="form-text text-muted">Minimum monthly payments (in dollars).</small>*/}
        </div>

        <div className="form-group">
          <label>Loan Term (Months)</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step="1" className="form-control"
              placeholder={this.defaultLoanTerm} value={loan_term}
              onChange={({ currentTarget: { value } }) => this.setLoanTerm(value)} />
          </div>
          {/*<small className="form-text text-muted">Minimum monthly payments (in dollars).</small>*/}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <form onSubmit={(event) => this.calculate(event)}>
        <div className="card-header">
          <h3>Inputs</h3>
        </div>
        <div className="card-body text-left">
          {this.body()}
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-outline-primary">Calculate</button>
        </div>
      </form>
    );
  }
}

export default Input;