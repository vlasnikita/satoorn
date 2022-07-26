import {
    GET_TRANSACTIONS,ADD_ACTIVE_TRANSACTION,REMOVE_ACTIVE_TRANSACTION,
    SET_ACTIVE_TRANSACTION,
    SUCCESS, FAIL
} from 'Constants/actions'
import {ROUTE_TRANSACTIONS} from 'Constants/routes'

export const getTransactions = userId => ({
    type: GET_TRANSACTIONS,
    callAPI: `${ROUTE_TRANSACTIONS}?userId=${userId}`
});

export const addActiveTransaction = payload => ({
    type: ADD_ACTIVE_TRANSACTION,
    payload
})

export const removeActiveTransaction = payload => ({
    type: REMOVE_ACTIVE_TRANSACTION,
    payload
})

export const setActiveTransactionSuccess = () => ({
    type: SET_ACTIVE_TRANSACTION + SUCCESS
})

export const setActiveTransactionFail = () => ({
    type: SET_ACTIVE_TRANSACTION + FAIL
})