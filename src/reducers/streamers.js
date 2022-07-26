import {
    GET_STREAMERS, GET_MORE_STREAMERS,
    SET_STREAMERS_SEARCH_TERM,
    RESET_FILTERS,
    START, SUCCESS
} from 'Constants/actions'
import { OFFSET } from 'Constants/routes'
const streamers = []

const initialState = {
    streamers,
    filtersUpdated: false,
    searchTerm: '',
    loading: false,
    loaded: false,
    noMore: false
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_STREAMERS + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false, noMore: false}
        case GET_STREAMERS + SUCCESS:
            return {...state, loading: false, loaded: true, streamers: payload, noMore: payload.length < OFFSET}

        case GET_MORE_STREAMERS + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false}
        case GET_MORE_STREAMERS + SUCCESS:
            return {...state, loading: false, loaded: true, streamers: [...state.streamers, ...payload], noMore: payload.length < OFFSET}

        case SET_STREAMERS_SEARCH_TERM:
            return {...state, searchTerm: payload, filtersUpdated: true }
        case RESET_FILTERS:
            return {...state, searchTerm: '',  filtersUpdated: true}

        default:
            return state
    }
};