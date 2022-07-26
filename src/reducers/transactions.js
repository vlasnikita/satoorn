import {
    GET_TRANSACTIONS,
    ADD_ACTIVE_TRANSACTION,  SET_ACTIVE_TRANSACTION, REMOVE_ACTIVE_TRANSACTION,
    START, SUCCESS, FAIL
} from 'Constants/actions'
import { OFFSET } from "Constants/routes";

const initialState = {
    transactions: [],
    loading: false,
    loaded: false,

    // transactions: require('Mocks/transactions'),
    // loading: false,
    // loaded: true,

    noMore: false,
    activeTransaction: {
        id: null,
        inProgress: false,
        success: false
    }
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_ACTIVE_TRANSACTION:
            return {...state, activeTransaction: payload}
        case SET_ACTIVE_TRANSACTION + SUCCESS:
            return {...state, activeTransaction: {...state.activeTransaction, inProgress: false, success: true}}
        case SET_ACTIVE_TRANSACTION + FAIL:
            return {...state, activeTransaction: {...state.activeTransaction, inProgress: false, success: false}}
        case REMOVE_ACTIVE_TRANSACTION:
            return {...state, activeTransaction: {
                    id: null,
                    inProgress: false,
                    success: false
                }}


        case GET_TRANSACTIONS + START:
            return {...state, loading: true, loaded: false, noMore: false}
        case GET_TRANSACTIONS + SUCCESS:
            return {...state, loading: false, loaded: true, transactions: payload, noMore: payload.length < OFFSET}
        default:
            return state
    }
};