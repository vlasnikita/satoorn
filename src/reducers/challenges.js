import {
    GET_CHALLENGES, GET_MORE_CHALLENGES,
    GET_CHALLENGES_BY_USER_ID, GET_MORE_CHALLENGES_BY_USER_ID,
    GET_GAME_CHALLENGES,
    POST_CHALLENGE, UPDATE_CHALLENGE,
    RESET_ACTIVE_STREAMER, RESET_FILTERS, SET_REDIRECT_TO_CHALLENGE, UNSET_REDIRECT_TO_CHALLENGE,
    SET_CHALLENGES_FILTER, SET_CHALLENGES_SEARCH_TERM,
    SET_CHALLENGES_BY_USER_ID_FILTER, SET_CHALLENGES_BY_USER_ID_SEARCH_TERM,
    START, SUCCESS
} from 'Constants/actions'
import { CHALLENGE_FILTERS } from 'Constants/filters'
import { OFFSET } from 'Constants/routes'

const initialState = {
    challenges: [],
    filter: CHALLENGE_FILTERS[0],
    searchTerm: '',

    activeStreamerChallenges: [],
    activeStreamerFilter: CHALLENGE_FILTERS[0],
    activeStreamerSearchTerm: '',

    filtersUpdated: false,
    loading: false,
    loaded: false,
    noMore: false,
    redirectToChallenge: null,

    gameChallenges: require('Mocks/challenges'),
    gameLoading: false,
    gameLoaded: true,
}

export default (state = initialState, { type, payload, body }) => {
    switch(type) {
        // ЗАПРОС И ДОЗАПРОС ВСЕХ ЧЕЛЛЕНДЖЕЙ
        case GET_CHALLENGES + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false, noMore: false}
        case GET_CHALLENGES + SUCCESS:
            return {...state, loading: false, loaded: true, challenges: payload, noMore: payload.length < OFFSET}
        case GET_MORE_CHALLENGES + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false}
        case GET_MORE_CHALLENGES + SUCCESS:
            return {...state, loading: false, loaded: true, challenges: [...state.challenges, ...payload], noMore: payload.length < OFFSET}

        case GET_GAME_CHALLENGES + START:
            return {...state, gameLoading: true, gameLoaded: false}
        case GET_GAME_CHALLENGES + SUCCESS:
            return {...state, gameLoading: false, gameLoaded: true, gameChallenges: payload}

        // ЗАПРОС И ДОЗАПРОС ЧЕЛЛЕНДЖЕЙ СТРИМЕРА
        case GET_CHALLENGES_BY_USER_ID + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false, noMore: false}
        case GET_CHALLENGES_BY_USER_ID + SUCCESS:
            return {...state, loading: false, loaded: true, activeStreamerChallenges: payload, noMore: payload.length < OFFSET}
        case GET_MORE_CHALLENGES_BY_USER_ID + START:
            return {...state, loading: true, loaded: false, filtersUpdated: false}
        case GET_MORE_CHALLENGES_BY_USER_ID + SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                activeStreamerChallenges: [...state.activeStreamerChallenges, ...payload],
                noMore: payload.length < OFFSET
            }


        // CLIENT-SIDE МУТАЦИИ ДАННЫХ ПОСЛЕ ЗАПРОСОВ НА БЕК
        case POST_CHALLENGE:
            return {...state, challenges: [payload, ...state.challenges]}
        case UPDATE_CHALLENGE:
            return {
                ...state,
                challenges: state.challenges.map(challenge => challenge.id === payload.id ? {...challenge, ...payload.body} : challenge),
                activeStreamerChallenges: state.activeStreamerChallenges.map(challenge => challenge.id === payload.id ? {...challenge, ...payload.body} : challenge)
            }
        case RESET_FILTERS:
            return {
                ...state,
                searchTerm: '',
                activeStreamerSearchTerm: '',
                filter: CHALLENGE_FILTERS[0],
                activeStreamerFilter: CHALLENGE_FILTERS[0],
                filtersUpdated: true
            }
        case SET_REDIRECT_TO_CHALLENGE:
            return { ...state, redirectToChallenge: payload }
        case UNSET_REDIRECT_TO_CHALLENGE:
            return { ...state, redirectToChallenge: null }

        // ФИЛЬТРАЦИЯ И ПОИСК
        case SET_CHALLENGES_FILTER:
            return {...state, challenges: [], filter: payload, filtersUpdated: true}
        case SET_CHALLENGES_SEARCH_TERM:
            return {...state, searchTerm: payload, filtersUpdated: true}
        case SET_CHALLENGES_BY_USER_ID_FILTER:
            return {...state, challenges: [], activeStreamerFilter: payload, filtersUpdated: true}
        case SET_CHALLENGES_BY_USER_ID_SEARCH_TERM:
            return {...state, challenges: [], activeStreamerSearchTerm: payload, filtersUpdated: true}

        // СТРАНИЦА АКТИВНОГО ПОЛЬЗОВАТЕЛЯ
        case RESET_ACTIVE_STREAMER:
            return {...state, activeStreamerChallenges: []}

        default:
            return state
    }
};