import {
    SET_WIDGET_CHALLENGE, UPDATE_WIDGET_CHALLENGE, RESET_WIDGET_CHALLENGE,
    START, SUCCESS
} from 'Constants/actions'

export default (state = null, { type, payload }) => {
    switch(type) {
        case UPDATE_WIDGET_CHALLENGE:
            return state.widgetChallenge.id === payload.id ? {...state.widgetChallenge , ...payload.body} : state.widgetChallenge
        case SET_WIDGET_CHALLENGE:
            return payload
        case RESET_WIDGET_CHALLENGE:
            return null

        default:
            return state
    }
};