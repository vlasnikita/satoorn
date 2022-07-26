import {UnitPay} from 'Static/js/unitpay'
import {YooMoneyCheckout} from 'Static/js/yoomoney'
import sha256 from 'crypto-js/sha256'
import QRCode  from 'qrcode';

import store from 'Store/index';
import { SECRET_KEY, PUBLIC_KEY, HOST } from 'Constants/payment_module'
import { HOSTING_ADDRESS } from 'Constants/routes'
import ALERT_TYPE from 'Constants/alert_type'

import { setActiveTransactionSuccess, setActiveTransactionFail } from 'Actions/transactions'
import { setRedirectToChallenge } from 'Actions/challenges'
import { updateChallenge } from 'Actions/challenges'
import { showAlert } from 'Actions/alert'
import { getChallengeById } from 'Actions/challenges';
import log from './logging';

export const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateUrl = url => {
    const re = /(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/
    return re.test(String(url).toLowerCase());
}

export const concatenateUrlParams = paramsMap => {
    let urlParamsString = ''
    const isObject = paramsMap === Object(paramsMap) && Object.prototype.toString.call(paramsMap) !== '[object Array]'
    if(!paramsMap || !isObject) return urlParamsString

    const keys = Object.keys(paramsMap)
    if(keys.length === 0) return urlParamsString
    else {
        Object.keys(paramsMap).forEach(paramKey => {
            if(!!paramsMap[paramKey]) {
                if (urlParamsString.length === 0) urlParamsString = `?${paramKey}=${paramsMap[paramKey]}`
                else urlParamsString = `${urlParamsString}&${paramKey}=${paramsMap[paramKey]}`
            }
        })
        return urlParamsString
    }
}

export const getFormSignature = (amount, transaction, desc) => {
    const hashStr = `${transaction}{up}${desc}{up}${amount}{up}${SECRET_KEY}`
    return sha256(hashStr)
}

export const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
}

export const openPaymentWidget = (amount, transaction, desc, isDonation, challengeId, challengeBody, streamerLogin) => {
    const signature = getFormSignature(amount, transaction, desc)

    // store.dispatch(getChallengeById(challengeId))

    const checkout = new window.YooMoneyCheckoutWidget({
        confirmation_token: 'confirmation-token', //TODO set proper token
        return_url: 'https://satoorn.ru/', //TODO set redirect 200 url
        customization: {
            //TODO customize view here
            modal: true
        },
        error_callback: function(error) {
            console.log(error)
        }
    });
  
    checkout.on('modal_close', () => {
        console.log('Код, который нужно выполнить после закрытия всплывающего окна.')
    });

    checkout.on('success', () => {
        log.debug('Успешный платеж', params);

        if(isDonation) {
            store.dispatch(updateChallenge(challengeId, {...challengeBody, isJustUpdated: true}))
        }
        else {
            store.dispatch(setActiveTransactionSuccess())
            store.dispatch(setRedirectToChallenge(challengeId, streamerLogin))
        }
        store.dispatch(showAlert(ALERT_TYPE.OK))

        checkout.destroy();
    });

    checkout.on('fail', () => {
        log.debug(message, params);

        store.dispatch(setActiveTransactionFail())
        store.dispatch(showAlert(ALERT_TYPE.PS_ERROR))

        checkout.destroy();
    });

    //Отображение платежной формы в контейнере
    checkout.render('payment-form');


    /*
    ----- OBSOLETE UNITPAY, EXAMPLE PURPOSES -----
    */
    // const payment = new UnitPay();
    // payment.createWidget({
    //     sum: +amount,
    //     desc: desc.toString(),
    //     account: transaction.toString(),
    //     domainName: "unitpay.money",
    //     signature: signature.toString(),
    //     publicKey: PUBLIC_KEY,
    //     locale: 'ru'
    // });

    // payment.success(function (params) {
    //     log.debug('Успешный платеж', params);

    //     if(isDonation) {
    //         store.dispatch(updateChallenge(challengeId, {...challengeBody, isJustUpdated: true}))
    //     }
    //     else {
    //         store.dispatch(setActiveTransactionSuccess())
    //         store.dispatch(setRedirectToChallenge(challengeId, streamerLogin))
    //     }
    //     store.dispatch(showAlert(ALERT_TYPE.OK))
    // });
    // payment.error(function (message, params) {
    //     log.debug(message, params);

    //     store.dispatch(setActiveTransactionFail())
    //     store.dispatch(showAlert(ALERT_TYPE.PS_ERROR))
    // });
    // return false;
}

export const getDonatersEmoji = () => {
    if(process.env.NODE_ENV === 'test') return ''
    const emojis = ['😱', '😵', '🤩', '🤗','🤔', '😮', '😌', '🙃']
    return emojis[ Math.floor(Math.random() * emojis.length) ]
}

export const getAlertSuccessEmoji = () => {
    if(process.env.NODE_ENV === 'test') return ''
    const emojis = [
        '😊','😋','😉','️😏','😌','🤤', '😸','️🙌',
        '👍','👊','✊','✌', '️🤘','🤟','👌','🤙',
        '🐒','🙈', '🌝','🎉','🎊','🔥','✨']

    return emojis[ Math.floor(Math.random() * emojis.length) ]

}

export const getOperationHash = str => {
    return sha256(str).toString()
};

export const linkifyPlainText = text => text.replace(/((http:|https:)[^\s]+[\w])/g, '<a href="$1" target="_blank">$1</a>')

export const checkIfNoOuterUIPage = () => {
    return (
        window.location.pathname === '/policy' ||
        window.location.pathname === '/agreement'
    )
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export const getItemByKey = (array, key) => array.reduce((acc, item) => {
    if(!acc) return item.key === key ? item : null
    else return acc
}, null)

export const generateQRCode = async text => {
    try {
      return await QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
}