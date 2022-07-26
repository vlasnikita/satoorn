import {SET_ACTIVE_PAYMENT} from 'Constants/actions'

const initialState = {
    
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_ACTIVE_PAYMENT:
            return {...payload}

        default:
            return state
    }
};