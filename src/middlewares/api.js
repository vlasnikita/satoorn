import { SUCCESS, FAIL, START } from 'Constants/actions'
import { openPopup } from 'Actions/popup';
import POPUP_TYPE from "Constants/popup_type";
import log from '../utils/logging';


export default store => next => action => {
    const {callAPI, type, body, ...rest} = action
    if (!callAPI) return next(action)

    next({...rest, type: type + START})

    //Если GET-запросы
    if(!body) fetch(callAPI, {
        credentials: "include",
        headers: {"Referer": window.location.pathname}
    })
    .then(res => res.json())
    .then(response => {
        if(response.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
        return next({ ...rest, type: type + SUCCESS, payload: response })
    })
    .catch(error => {
        log.error('',error)
        return next({ ...rest, type: type + FAIL, error })
    })
    //Если PUT/POST-запросы
    else fetch(callAPI, {
        credentials: "include",
        headers: {"Content-Type":"application/json", "Referer": window.location.pathname},
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => {
        if(response.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
        log.debug('', response)
        return next({ ...rest, type: type + SUCCESS, payload: response })
    })
    .catch(error => {
        log.error('', error)
        return next({ ...rest, type: type + FAIL, error })
    })
}