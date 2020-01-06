import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import app from './app';

const rootReducer = combineReducers({
    app,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));