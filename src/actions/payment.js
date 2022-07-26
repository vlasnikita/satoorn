import {
    SET_ACTIVE_PAYMENT
} from 'Constants/actions'

export const setActivePayment = payload => ({
    type: SET_ACTIVE_PAYMENT,
    payload
})