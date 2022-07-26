import {GET_CHALLENGE_BY_ID, SET_ACTIVE_CHALLENGE, START, SUCCESS, UPDATE_CHALLENGE} from 'Constants/actions'

const activeChallenge = {}

const initialState = {
    activeChallenge,
    loading: false,
    loaded: false
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_CHALLENGE_BY_ID + START:
            return {...state, loading: true, loaded: false}
        case GET_CHALLENGE_BY_ID + SUCCESS:
            return {...state, loading: false, loaded: true, activeChallenge: payload}
        case UPDATE_CHALLENGE:
            return {
                ...state,
                activeChallenge: state.activeChallenge.id === payload.id ? {...state.activeChallenge, ...payload.body} : state.activeChallenge
            }
        case SET_ACTIVE_CHALLENGE:
            return {...state, activeChallenge: payload}

        default:
            return state
    }
};