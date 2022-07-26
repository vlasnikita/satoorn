import {OPEN_POPUP, CLOSE_POPUP} from 'Constants/actions'

export const openPopup = (type, acceptingChallenge) => ({
    type: OPEN_POPUP,
    payload: {type, acceptingChallenge}
})

export const closePopup = () => ({
    type: CLOSE_POPUP
})