import { Meteor } from 'meteor/meteor';
import React, { PropTypes, Component } from 'react';

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object,
};
