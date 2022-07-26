import { openPopup } from 'Actions/popup';
import POPUP_TYPE from "Constants/popup_type";

import {
    ROUTE_CHALLENGE,
    ROUTE_CHALLENGES,
    ROUTE_CHALLENGES_ACCEPT,
    ROUTE_CHALLENGES_APPLY_COMMISSION,
    ROUTE_CHALLENGES_REJECT,
    ROUTE_CHALLENGES_SAVE,
    ROUTE_COMPLAIN,
    ROUTE_NOTIFICATIONS_READ,
    ROUTE_TOGGLE_ACCEPT_CHALLENGE_ONBOARDING,
    ROUTE_TOGGLE_DONATE_CHALLENGE_ONBOARDING,
    ROUTE_TOGGLE_COMMON_ONBOARDING,
    ROUTE_WIDGET
} from 'Constants/routes';
import store from 'Store/index';
import { concatenateUrlParams } from 'Utils/index';
import log from '../utils/logging';


export const postComplain = async body => {
    const res = await fetch(`${ROUTE_COMPLAIN}`, {
            method: 'POST',
            credentials: "include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })

        if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
        log.debug('RESPONSE', res)
        return res
}

export const generateWidgetPostfix = async payload => {
    const res = await fetch(`${ROUTE_WIDGET}`, {
        method: 'POST',
        credentials: "include",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    })

    // if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
    log.debug('RESPONSE', res)
    return res
}

export const createChallenge = async body => {
    log.debug('REQUEST', body)
    const res = await fetch(`${ROUTE_CHALLENGES_SAVE}`, {
        method: 'POST',
        credentials: "include",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
    })

    log.debug('RESPONSE', res)
    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
    else if (res.status === 200) {
        let json = await res.json()
        return json
    }
}

export const donateChallenge = async (amount, challengeId, hash) => {
    const res = await fetch(`${ROUTE_CHALLENGES}donate?amount=${amount}&id=${challengeId}&operationKey=${hash}`, {
        method: 'POST',
        credentials: "include"
    })
    log.debug('RESPONSE', res)
    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
    else if (res.status === 200) {
        let json = await res.json()
        return json
    }
}

export const acceptChallenge = async (challengeId, type, value, donationAmount, operationKey) => {
    const urlParams = concatenateUrlParams({ challengeId, type, value, donationAmount, operationKey })
    const res = await fetch(`${ROUTE_CHALLENGES_ACCEPT}${urlParams}`, {
        method: 'GET',
        credentials: "include"
    })
    log.debug('RESPONSE', res)
    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
    else if (res.status === 200) {
        let json = await res.json()
        return json
    }
}

export const rejectChallenge = async (id, hash) => {
    const res = await fetch(`${ROUTE_CHALLENGES_REJECT}?id=${id}&operationKey=${hash}`, {
        method: 'GET',
        credentials: "include"
    })
    log.debug('RESPONSE', res)
    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
    else if (res.status === 200) {
        let json = await res.json()
        return json
    }
}

export const toggleAcceptChallengeOnboardinig = async () => {
    const res = await fetch(ROUTE_TOGGLE_ACCEPT_CHALLENGE_ONBOARDING, {
        method: 'POST',
        credentials: "include",
    })

    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
}

export const toggleDonateChallengeOnboardinig = async () => {
    const res = await fetch(ROUTE_TOGGLE_DONATE_CHALLENGE_ONBOARDING, {
        method: 'POST',
        credentials: "include",
    })

    if(res.status == 302) store.dispatch(openPopup(POPUP_TYPE.UNREGISTRED))
}

export const toggleCommonOnboarding = async () => {
    const res = await fetch(ROUTE_TOGGLE_COMMON_ONBOARDING, {
        method: 'POST',
        credentials: "include",
    })
}

export const readNotifications = async idsToDelete => {
    await fetch(`${ROUTE_NOTIFICATIONS_READ}`,
     {
        method: 'PUT',
        credentials: "include",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(idsToDelete)
    }
   )
}

export const applyCommission = async (challengeId, method) => {
    const res = await fetch(`${ROUTE_CHALLENGES_APPLY_COMMISSION}?challengeId=${challengeId}&payoutType=${method}`, {
        method: 'GET',
        credentials: "include"
    })
    log.debug('RESPONSE', res)
    if (res.status === 200) {
        let json = await res.json()
        return json
    }
}

export const getChallengeById = async challengeId => {
    const res = await fetch(`${ROUTE_CHALLENGE}${challengeId}`, {
        method: 'GET',
        credentials: "include"
    })
    log.debug('RESPONSE', res)
    if (res.status === 200) {
        let json = await res.json()
        return json
    }
}