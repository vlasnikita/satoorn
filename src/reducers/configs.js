import {GET_MIN_PAYMENT, GET_SETTINGS, START, SUCCESS} from 'Constants/actions'

const settingsValue = {
        challengeAcceptDetailsConfirmed: false,
        challengeDonateDetailsConfirmed: false,
        serviceOnboardingConfirmed: false
    }

const initialState = {
    minPaymentAmount: {
        value: 25,
        loaded: false,
        loading: false
    },
    settings: {
        value: settingsValue,
        loaded: false,
        loading: false
    },
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_MIN_PAYMENT + START:
            return {...state, minPaymentAmount: {
                value: state.minPaymentAmount.value,
                loading: true,
                loaded: false
            }}
        case GET_MIN_PAYMENT + SUCCESS:
            return {...state, minPaymentAmount: {
                value: payload.minPaymentAmount,
                loading: false,
                loaded: true,
            }}

        case GET_SETTINGS + START:
            return {...state, settings: {
                value: state.settings.value,
                loading: true,
                loaded: false,
            }}
        case GET_SETTINGS + SUCCESS:
            return {...state, settings: {
                value: payload,
                loading: false,
                loaded: true,
            }}
        default:
            return state
    }
};