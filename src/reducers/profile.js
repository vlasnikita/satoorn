import {
    GET_PROFILE,
    SUCCESS, FAIL
} from 'Constants/actions'

const profile =  {
    profile: {},
    loading: false,
    loaded: false
}

// const profile =  {
//     profile: require('Mocks/streamers')[0],
//     loading: false,
//     loaded: true
// }

export default (state = profile, {type, payload}) => {
    switch (type) {
        case GET_PROFILE + SUCCESS:
            return {profile: payload, loaded: true}
        case GET_PROFILE + FAIL:
            return {profile: {}, loaded: true}

        default:
            return state
    }
};
