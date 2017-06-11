import { Meteor } from 'meteor/meteor';
import React, { PropTypes, Component } from 'react';

export default class HomepageContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentWillMount() {
    Meteor.call('test', (err, res) => {
      console.log(res);
    });
  }
  test() {
    Meteor.call('test', (err, res) => {
      alert(res);
    });
  }
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <p>操作</p>
        <button onClick={() => { this.test(); }}>test</button>
      </div>
    );
  }
}

HomepageContainer.propTypes = {
};
