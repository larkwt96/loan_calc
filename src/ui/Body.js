import React from 'react';
import Input from './input/Input';
import Output from './Output';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined,
    };
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <Input displayResults={(results) => this.setState({ results })} />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <Output results={this.state.results} clearResults={() => this.setState({ results: undefined })} />
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default Body;