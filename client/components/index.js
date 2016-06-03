import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/reducers';
import App from './App';

import '../styles/index.scss';

const middlewares = [thunkMiddleware];

//if (process.env.NODE_ENV === 'development') {
    console.log('DEVELOPMENT!');
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares.push(logger);
//}

console.log('node_env', process.env.NODE_ENV);

let store = createStore(reducers, applyMiddleware(...middlewares));

ReactDom.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));