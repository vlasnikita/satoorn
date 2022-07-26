import {OPEN_POPUP, CLOSE_POPUP} from 'Constants/actions'

const initialState = {
    opened: false,
    type: null,
    acceptingChallenge: {}
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case OPEN_POPUP:
            return {opened: true, type: payload.type, acceptingChallenge: payload.acceptingChallenge || state.acceptingChallenge}
        case CLOSE_POPUP:
            return {opened: false, type: undefined, acceptingChallenge: null}
        default:
            return state
    }
};
