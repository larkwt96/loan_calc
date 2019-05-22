import React from 'react';
import Model from '../model/Model'

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loan_amount: undefined,
      loan_rate: undefined,
      down_payment: undefined,
      minimum_payment: undefined,
    };
  }

  parseDollar(amount) {
    if (amount === "") {
      return undefined;
    } else {
      return Math.floor(parseFloat(amount) * 100) / 100;
    }
  }

  updateRate(loan_rate) {
    if (loan_rate === "") {
      loan_rate = undefined;
    } else {
      loan_rate = parseFloat(loan_rate);
    }
    this.setState({ loan_rate });
  }

  calculate() {
    let { loan_amount = 0, loan_rate = 0, down_payment = 0, minimum_payment = 50 } = this.state;
    let model = new Model(loan_amount, loan_rate, down_payment, minimum_payment);
    this.props.displayResults(model.run());
  }

  body() {
    let { loan_amount = "", loan_rate = "", down_payment = "", minimum_payment = "" } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label>Loan Amount</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={loan_amount}
              onChange={({ currentTarget: { value } }) => this.setState({ loan_amount: this.parseDollar(value) })} />
          </div>
          <small className="form-text text-muted">Input loan amount (in dollars).</small>
        </div>

        <div className="form-group">
          <label>Loan Rate</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <input type="number" step=".01" className="form-control"
              placeholder="0" value={loan_rate}
              onChange={(event) => this.updateRate(event.currentTarget.value)} />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
          <small className="form-text text-muted">Input loan rate (in percentage).</small>
        </div>

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
          <small className="form-text text-muted">Amount payed upfront (in dollars).</small>
        </div>

        <div className="form-group">
          <label>Minimum Payment</label>
          <div className="input-group mb-3 col-xl-8 col-lg-10">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="number" step=".01" className="form-control"
              placeholder="50" value={minimum_payment}
              onChange={({ currentTarget: { value } }) => this.setState({ minimum_payment: this.parseDollar(value) })} />
          </div>
          <small className="form-text text-muted">Minimum monthly payments (in dollars).</small>
        </div>
      </React.Fragment>

    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="card-header">
          <h3>Inputs</h3>
        </div>
        <div className="card-body text-left">
          {this.body()}
        </div>
        <div className="card-footer">
          <button onClick={() => this.calculate()} className="btn btn-outline-primary">Calculate</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Input;