import React from 'react';

class Output extends React.Component {
  renderResults() {
    let {
      monthly_payment = 0,
      total_principal = 0,
      total_interest = 0,
      total_payment = 0,
    } = this.props.results;
    let valueClass = "h7";
    return (
      <React.Fragment>
        <ul className="list-group">
          <li className="list-group-item">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p className="h4">Total Payment</p>
                <p className={valueClass}>{total_payment}</p>
              </li>
              <li className="list-group-item">
                <p className="h4">Monthly Payment</p>
                <p className={valueClass}>{monthly_payment}</p>
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
                      {total_principal}
                    </p>
                  </td>
                  <td>
                    <p className={valueClass}>
                      {total_interest}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </React.Fragment>
    );
  }

  renderBlank() {
    return (
      <div>
        Input values and press calculate!
      </div>
    );
  }

  render() {
    let results;
    if (this.props.results === undefined) {
      results = this.renderBlank();
    } else {
      results = this.renderResults();
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