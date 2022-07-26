import {
    SET_CREATE_CHALLENGE_TYPE,
    SET_CREATE_CHALLENGE_DESCRIPTION,
    SET_CREATE_CHALLENGE_TITLE,
    SET_CREATE_CHALLENGE_DRAFT
} from 'Constants/actions'

const initialState = {
    title: '',
    description: '',
    type: null,
    challengeDraft: null
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_CREATE_CHALLENGE_DESCRIPTION:
            return {...state, description: payload}
        case SET_CREATE_CHALLENGE_TYPE:
            return {...state, type: payload}
        case SET_CREATE_CHALLENGE_TITLE:
            return {...state, title: payload}
        case SET_CREATE_CHALLENGE_DRAFT:
            return {...state, challengeDraft: payload}

        default:
            return state
    }
};