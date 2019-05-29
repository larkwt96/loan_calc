import React from 'react';
import Model from '../model/Model';
import Loans from './Loans';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loan_amount: undefined,
      loan_rate: undefined,
      down_payment: undefined,
      minimum_payment: undefined,
      loan_term: undefined,
    };
  }

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
    const { loan_amount = 0, loan_rate = 0, down_payment = 0, minimum_payment = 50, loan_term = 120 } = this.state;
    const model = new Model({ loan_amount, loan_rate, down_payment, minimum_payment, loan_term });
    Promise.resolve().then(() => {
      this.props.displayResults(model.run());
    });
  }

  body() {
    const { loan_amount = "",
      loan_rate = "",
      down_payment = "",
      minimum_payment = "",
      loan_term = "" } = this.state;
    return (
      <React.Fragment>
        <Loans
          loan_amount={loan_amount}
          loan_rate={loan_rate}
          parseDollar={this.parseDollar}
          setLoanRate={(loan_rate) => this.setState({ loan_rate })}
          setLoanAmount={(loan_amount) => this.setState({ loan_amount })} />
        <div className="form-group">
          <label>Down Payment</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={down_payment}
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
              placeholder="50" value={minimum_payment}
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
              placeholder="120" value={loan_term}
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