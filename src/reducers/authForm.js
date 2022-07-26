import {SET_FORM_VISIBILITY} from 'Constants/actions'

const initialState = false

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_FORM_VISIBILITY:
            return payload
        default:
            return state
    }
};