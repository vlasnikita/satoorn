import {
    SET_ACTIVE_STREAMER, SET_ACTIVE_STREAMER_CLIENTSIDE, RESET_ACTIVE_STREAMER,
    START, SUCCESS
} from 'Constants/actions'

const initialState = {
    activeStreamer: {},
    loading: false,
    loaded: false
}

// const initialState = {
//     activeStreamer: require('Mocks/streamers')[0],
//     loading: false,
//     loaded: true
// }

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_ACTIVE_STREAMER + START:
            return {...state, loading: true, loaded: false}
        case SET_ACTIVE_STREAMER + SUCCESS:
            return {...state, loading: false, loaded: true, activeStreamer: payload}
        case SET_ACTIVE_STREAMER_CLIENTSIDE:
            return {...state, loading: false, loaded: true, activeStreamer: payload}
        case RESET_ACTIVE_STREAMER:
            return {activeStreamer: {}, loading: false, loaded: false}
        default:
            return state
    }
};