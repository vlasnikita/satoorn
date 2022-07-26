import {GET_SETTINGS, GET_MIN_PAYMENT} from 'Constants/actions'
import {ROUTE_MIN_PAYMENT, ROUTE_USER_SETTINGS} from 'Constants/routes'

export const getMinPayment = () => ({
    type: GET_MIN_PAYMENT,
    callAPI: ROUTE_MIN_PAYMENT
})

export const getSettings = () => ({
    type: GET_SETTINGS,
    callAPI: ROUTE_USER_SETTINGS
})