import React from 'react';
//import ProgressBar from 'react-bootstrap/ProgressBar';

class Output extends React.Component {
  renderResults() {
    const {
      monthly_payment = 0,
      total_principal = 0,
      total_interest = 0,
      total_payment = 0,
    } = this.props.results;
    const valueClass = "h7";
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return (
      <React.Fragment>
        <ul className="list-group">
          <li className="list-group-item">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p className="h4">Total Payment</p>
                <p className={valueClass}>{formatter.format(total_payment)}</p>
              </li>
              <li className="list-group-item">
                <p className="h4">Monthly Payment</p>
                <p className={valueClass}>{formatter.format(monthly_payment)}</p>
              </li>
            </ul>
          </li>
          <li className="list-group-item">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Total Principal</th>
                  <th scope="col">Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className={valueClass}>
                      {formatter.format(total_principal)}
                    </p>
                  </td>
                  <td>
                    <p className={valueClass}>
                      {formatter.format(total_interest)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            {/*<ProgressBar now={total_principal} max={total_payment} />;*/}
          </li>
        </ul>
      </React.Fragment>
    );
  }

  renderBlank() {
    return (
      <React.Fragment>
        Input values and press calculate!
      </React.Fragment>
    );
  }

  renderCalculating() {
    return (
      <React.Fragment>
        Calculating..
      </React.Fragment>
    );
  }

  render() {
    let results;
    if (this.props.results === undefined) {
      results = this.renderBlank();
    } else {
      if (this.props.results.done) {
        results = this.renderResults();
      } else {
        results = this.renderCalculating();
      }
    }
    return (
      <React.Fragment>
        <div className="card-header">
          <h3>Results</h3>
        </div>
        <div className="card-body">
          {results}
        </div >
        <div className="card-footer">
          <button onClick={() => this.props.clearResults()} className="btn btn-outline-primary">Clear</button>
        </div>
      </React.Fragment>

    );
  }
}

export default Output;