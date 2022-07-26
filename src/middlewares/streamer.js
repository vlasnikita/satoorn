import { SET_ACTIVE_STREAMER, SUCCESS } from 'Constants/actions'

export default store => next => action => {
    const {type, payload, ...rest } = action
    if(
        type === SET_ACTIVE_STREAMER + SUCCESS
        && payload.id === 'N/A'
    ) return next({ ...rest, type, payload: {notFound: true} })
    else return next(action)
}