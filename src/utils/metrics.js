const amplitude = require('amplitude-js');
const API_KEY = process.env.AMPL_API_KEY;
const loggingEnabled = process.env.NODE_ENV === 'production';

if (loggingEnabled) {
    amplitude.getInstance().init(API_KEY);
}

export const logUserAction = (context, action, userId) => {
    defaultLogEvent(`${context}_${action}_CLICKED`, userId)
}

export const logShareEvent = (context, type, userId) => {
    defaultLogEvent(context + '_SHARE_' + type, userId)
}

export const logDonateEvent = (context, userId) => {
    defaultLogEvent(context + '_DONATE_BUTTON_CLICKED', userId)
}

export const logAuthButtonClick = (event) => {
    defaultLogEvent(event + '_LOGIN_BUTTON_CLICKED', null)
}

export const defaultLogEvent = (event,userId) => {
    if (loggingEnabled) {
        const amplitudeClient = amplitude.getInstance();
        amplitudeClient.setUserId(userId)
        amplitudeClient.logEvent(event)
    }

}
