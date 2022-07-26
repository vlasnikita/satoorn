import { SHOW_ALERT, HIDE_ALERT } from 'Constants/actions'

const initialState = {
    opened: false,
    type: null
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SHOW_ALERT:
            return {opened: true, type: payload.type}
        case HIDE_ALERT:
            return {opened: false, type: null}
        default:
            return state
    }
};
