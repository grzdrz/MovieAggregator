import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ReducerManager from '../../store/reducerManager';
import ProductSupermarket from './index.jsx';

import '../base/base.scss';
import './index.scss';

require.context('../../', true, /\.(ttf|eot|woff|woff2|svg|png|jpg|json)$/);

const reducerManager = new ReducerManager();
const store = createStore(reducerManager.reducer);
store.dispatch({
  type: 'default',
});

const targetElement = document.querySelector('.app');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/ProductSupermarket' />} />
        <Route path='/ProductSupermarket/' component={ProductSupermarket} />
      </Switch>
    </Router>
  </Provider>,
  targetElement,
);
