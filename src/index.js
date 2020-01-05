import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppContainer from 'containers/app';
import { Provider } from 'react-redux';
import store from 'store';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
