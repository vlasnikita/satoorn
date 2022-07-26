import {
    UPDATE_WIDGET_CHALLENGE, SET_WIDGET_CHALLENGE, RESET_WIDGET_CHALLENGE
} from 'Constants/actions'

export const updateWidgetChallenge = (id, body) => ({
    type: UPDATE_WIDGET_CHALLENGE,
    payload: { id, body }
})

export const setWidgetChallenge = challenge => ({
    type: SET_WIDGET_CHALLENGE,
    payload: challenge
})

export const resetWidgetChallenge = () => ({
    type: RESET_WIDGET_CHALLENGE
})
