import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleRoot } from 'radium';

import store from '../../redux/store';

import MainLayout from '../../ui/layouts/Main.jsx';
import HomepageContainer from '../../ui/containers/HomepageContainer.jsx';

const history = syncHistoryWithStore(browserHistory, store);
const route = store.getState().route;

Meteor.startup(() => {
  render(
    <StyleRoot>
      <Provider store={store}>
        <Router history={history}>
          <Route path={route.root} component={MainLayout}>
            <IndexRoute component={HomepageContainer} />
          </Route>
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('main-container')
  );
});
