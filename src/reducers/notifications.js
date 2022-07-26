import {
    GET_NOTIFICATIONS,
    START, SUCCESS, FAIL
} from 'Constants/actions'


const initialState = {
    notifications: [],
    loaded: false,
    loading: false
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_NOTIFICATIONS + START:
            return {...state, loading: true, loaded: false}
        case GET_NOTIFICATIONS + SUCCESS:
            return {...state, loading: false, loaded: true, notifications: payload}
        case GET_NOTIFICATIONS + FAIL:
            return {...state, loading: false, loaded: true, notifications: []}

        default:
            return state
    }
};