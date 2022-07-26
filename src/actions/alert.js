import {HIDE_ALERT, SHOW_ALERT} from 'Constants/actions'

export const showAlert = type => ({
    type: SHOW_ALERT,
    payload: {type}
});

export const hideAlert = () => ({
    type: HIDE_ALERT
});