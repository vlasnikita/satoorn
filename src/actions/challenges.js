import {
    GET_CHALLENGES, GET_MORE_CHALLENGES,
    GET_CHALLENGE_BY_ID,
    GET_CHALLENGES_BY_USER_ID, GET_MORE_CHALLENGES_BY_USER_ID,
    GET_GAME_CHALLENGES,
    POST_CHALLENGE, SET_CHALLENGE_STATE,
    UPDATE_CHALLENGE, UPDATE_WIDGET_CHALLENGE,
    SET_CHALLENGES_FILTER, SET_CHALLENGES_SEARCH_TERM, RESET_FILTERS,
    SET_CHALLENGES_BY_USER_ID_FILTER, SET_CHALLENGES_BY_USER_ID_SEARCH_TERM,
    SET_REDIRECT_TO_CHALLENGE, UNSET_REDIRECT_TO_CHALLENGE
} from 'Constants/actions'
import {
    ROUTE_CHALLENGES_ALL, ROUTE_CHALLENGE, ROUTE_CHALLENGES_USER,
    ROUTE_CHALLENGES_CHANGE_STATE
} from 'Constants/routes'
import { concatenateUrlParams } from 'Utils/index'

export const getChallenges = (state, searchTerm) => {
    const params = concatenateUrlParams({ searchTerm, state })
    return ({
        type: GET_CHALLENGES,
        callAPI: `${ROUTE_CHALLENGES_ALL}${params}`
    })
}

export const getMoreChallenges = (from, state, searchTerm) => {
    const params = concatenateUrlParams({ searchTerm, state, from })
    return ({
            type: GET_MORE_CHALLENGES,
            callAPI: `${ROUTE_CHALLENGES_ALL}${params}`
        })
}

export const getChallengesByUserId = (userId, state, searchTerm) => {
    const params = concatenateUrlParams({ userId, searchTerm, state })
    return ({
            type: GET_CHALLENGES_BY_USER_ID,
            callAPI: `${ROUTE_CHALLENGES_USER}${params}`
        })
}
export const getMoreChallengesByUserId = (userId, from, state, searchTerm) => {
    const params = concatenateUrlParams({ userId, searchTerm, state, from })
    return ({
            type: GET_MORE_CHALLENGES_BY_USER_ID,
            callAPI: `${ROUTE_CHALLENGES_USER}${params}`
        })
}

export const getGameChallenges = (userId) => {
    const params = concatenateUrlParams({ userId })
    return ({
        type: GET_GAME_CHALLENGES,
        callAPI: `${ROUTE_CHALLENGES_ALL}${params}`
    })
}

export const getChallengeById = id => ({
    type: GET_CHALLENGE_BY_ID,
    callAPI: `${ROUTE_CHALLENGE}${id}`
})

export const postChallenge = challenge => ({
    type: POST_CHALLENGE,
    payload: challenge
})

export const updateChallenge = (id, body) => ({
    type: UPDATE_CHALLENGE,
    payload: { id, body }
})

export const setChallengeState = (id, state) => ({
    type: SET_CHALLENGE_STATE,
    callAPI: `${ROUTE_CHALLENGES_CHANGE_STATE}${id}?state=${state}`,
    payload: { id, state }
})

export const setChallengesFilter = filter => ({
    type: SET_CHALLENGES_FILTER,
    payload: filter
})

export const setChallengesByUserIdFilter = filter => ({
    type: SET_CHALLENGES_BY_USER_ID_FILTER,
    payload: filter
})

export const setChallengesSearchTerm = searchTerm => ({
    type: SET_CHALLENGES_SEARCH_TERM,
    payload: searchTerm
})

export const setChallengesByUserIdSearchTerm = searchTerm => ({
    type: SET_CHALLENGES_BY_USER_ID_SEARCH_TERM,
    payload: searchTerm
})

export const resetFilters = () => ({
    type: RESET_FILTERS
})

export const setRedirectToChallenge = (challengeId, login) => ({
    type: SET_REDIRECT_TO_CHALLENGE,
    payload: {challengeId, login}
})

export const unsetRedirectToChallenge = () => ({ type: UNSET_REDIRECT_TO_CHALLENGE })

