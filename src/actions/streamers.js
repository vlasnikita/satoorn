import {
    GET_STREAMERS, GET_MORE_STREAMERS,
    RESET_ACTIVE_STREAMER, SET_ACTIVE_STREAMER, SET_ACTIVE_STREAMER_CLIENTSIDE,
    SET_STREAMERS_SEARCH_TERM
} from 'Constants/actions'
import { ROUTE_STREAMER, ROUTE_STREAMERS, ROUTE_STREAMERS_SEARCH } from 'Constants/routes'

export const getStreamers = searchTerm => {
    return !searchTerm
        ? ({
            type: GET_STREAMERS,
            callAPI: ROUTE_STREAMERS
        })
        : ({
            type: GET_STREAMERS,
            callAPI: `${ROUTE_STREAMERS_SEARCH}?searchTerm=${searchTerm}`
        })
};

export const getMoreStreamers = (from, searchTerm) => {
    return !searchTerm
        ? ({
            type: GET_MORE_STREAMERS,
            callAPI: `${ROUTE_STREAMERS}?from=${from}`
        })
        : ({
            type: GET_MORE_STREAMERS,
            callAPI: `${ROUTE_STREAMERS}?searchTerm=${searchTerm}&from=${from}`
        })
}

export const setActiveStreamer = login => ({
    type: SET_ACTIVE_STREAMER,
    callAPI: `${ROUTE_STREAMER}${login}`
})

export const setActiveStreamerClientside = streamer => ({
    type: SET_ACTIVE_STREAMER_CLIENTSIDE,
    payload: streamer
})

export const resetActiveStreamer = () => ({
    type: RESET_ACTIVE_STREAMER
})

export const setStreamersSearchTerm = searchTerm => ({
    type: SET_STREAMERS_SEARCH_TERM,
    payload: searchTerm
})