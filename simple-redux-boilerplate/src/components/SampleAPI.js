import React, { Component } from 'react';

export default class Footer extends Component {

constructor(props) {
  super(props);
  this.state = {
    users: []
  };
}

componentDidMount() {
  fetch('http://localhost:8080/users')
  .then(response => response.json())
  .then(response => {
    this.setState({ users: response });
  });
}
  render() {
    return (
        <div style = {{ "display": "table" }}>
            {this.state.users && this.state.users.length > 0 ? <div>
                <div>Data from DB</div>
                <div style = {{ 'display': 'table-row' }}>
                    <div style = {{ 'display': 'table-cell', padding: 5, border: '1px solid', minWidth: "100px" }}>ID</div>
                    <div style = {{ 'display': 'table-cell', padding: 5, border: '1px solid', minWidth: "100px" }}>TYPE</div>
                </div>
                <div>{this.state.users.map((user, userKey) => {
                    return(<div key = { userKey }>
                    <div style = {{ 'display': 'table-row' }}>
                        <div style = {{ 'display': 'table-cell', padding: 5, border: '1px solid', minWidth: "100px" }}>{ user.id }</div>
                        <div style = {{ 'display': 'table-cell', padding: 5, border: '1px solid', minWidth: "100px" }}>{ user.type }</div>
                    </div>
                    </div>)
                })}</div>
            </div> : <div>Fetching</div>}
        </div>
    )
  }
}
