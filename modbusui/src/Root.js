import React from 'react';
import { Router, Route, hashHistory } from 'react-router'

import { App } from './components/App.js';
import { Charts } from './containers/charts/charts';

export default () => {
    return (
      <Router history={hashHistory} >
       <Route path="/" component={Charts}>
        <Route path="charts" component={App} />
       </Route>
      </Router>
    );
}
