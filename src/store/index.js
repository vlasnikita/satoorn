import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import activeChallengeReducer from '../reducers/activeChallenge'
import activeStreamerReducer from '../reducers/activeStreamer'
import alertReducer from '../reducers/alert'
import authFormReducer from '../reducers/authForm'
import challengesReducer from '../reducers/challenges'
import configsReducer from '../reducers/configs'
import createChallengeReducer from '../reducers/createChallenge'
import notificationsReducer from '../reducers/notifications'
import paymentReducer from '../reducers/payment'
import profileReducer from '../reducers/profile'
import popupReducer from '../reducers/popup'
import streamersReducer from '../reducers/streamers'
import transactionsReducer from '../reducers/transactions'
import templatesReducer from '../reducers/templates'
import widgetChallengeReducer from '../reducers/widgetChallenge'

import apiMiddleware from '../middlewares/api'
import streamerMiddleware from '../middlewares/streamer'
import history from './history'

const requireEnableDebugTools = process.env.NODE_ENV !== 'production';


export default createStore(
    combineReducers({
        profile: profileReducer,
        challenges: challengesReducer,
        configs: configsReducer,
        authForm: authFormReducer,
        streamers: streamersReducer,
        activeStreamer: activeStreamerReducer,
        popup: popupReducer,
        transactions: transactionsReducer,
        templates: templatesReducer,
        createChallenge: createChallengeReducer,
        activeChallenge: activeChallengeReducer,
        notifications: notificationsReducer,
        alert: alertReducer,
        widgetChallenge: widgetChallengeReducer,
        payment: paymentReducer
    }),
    resolveEnchancers()
);

function resolveEnchancers() {
    if(requireEnableDebugTools) {
        const composer = resolveDebugComposer()
        return composer(applyMiddleware(thunk, apiMiddleware, streamerMiddleware, routerMiddleware(history), logger))
    }
    else {
        return compose(applyMiddleware(thunk, apiMiddleware, streamerMiddleware, routerMiddleware(history)))
    }
}
function resolveDebugComposer() {
    if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
       return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    return compose;
}

