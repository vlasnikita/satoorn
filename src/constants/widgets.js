import cardIcon from 'Static/widgets/widgets-card.svg'
import lineIcon from 'Static/widgets/widgets-line.svg'

import leftIcon from 'Static/widgets/widgets-invite-left.svg'
import rightIcon from 'Static/widgets/widgets-invite-right.svg'
import topIcon from 'Static/widgets/widgets-invite-top.svg'

import alertIcon from 'Static/widgets/widgets-type-alert.svg'
import inviteIcon from 'Static/widgets/widgets-type-invite.svg'
import challengeIcon from 'Static/widgets/widgets-type-challenge.svg'

import satoornGif from 'Static/widgets/widgets-notification-satoorn.gif'
import giftGif from 'Static/widgets/widgets-notification-gift.gif'
import loveGif from 'Static/widgets/widgets-notification-love.gif'
import popcornGif from 'Static/widgets/widgets-notification-popcorn.gif'

export const CHALLENGE_WIDGET_FORMATS = [
    {
        key: 'card',
        name: 'Карточка',
        icon: cardIcon,
        classnamePostfix: '_card'
    },
    {
        key: 'line',
        name: 'Строка',
        icon: lineIcon,
        classnamePostfix: '_line'

    }
]

export const INVITE_WIDGET_FORMATS = [
    {
        key: 'left',
        icon: leftIcon,
        classnamePostfix: '_left'
    },
    {
        key: 'top',
        icon: topIcon,
        classnamePostfix: '_top'
    },
    {
        key: 'right',
        icon: rightIcon,
        classnamePostfix: '_right'
    }
]

export const NOTIFICATION_WIDGET_ANIMATIONS = [
    {
        key: 'satoorn',
        gif: satoornGif
    },
    {
        key: 'gift',
        gif: giftGif
    },
    {
        key: 'love',
        gif: loveGif
    },
    {
        key: 'popcorn',
        gif: popcornGif
    }
]

export const NOTIFICATION_WIDGET_ALERTS = [
    {
        key: 'newChallenge',
        enabled: true,
        text: 'новый челлендж'
    },
    {
        key: 'newDonation',
        enabled: true,
        text: 'новый донат'
    }
]

export const WIDGET_SETTINGS_DEFAULTS = {
    notifications: {
        animation: NOTIFICATION_WIDGET_ANIMATIONS[0].key,
        sound: 1,
        initialSize:{
            width: 400,
            height: 240
        },
        placeholders: {
            amount: '999',
            username: 'кул_стори_боб',
            title: 'Посмотреть за стрим все тиктоки на свете с закрытыми глазами'
        },
        header: '{amount}₽ - {username}!',
        body: '{title} - {link}'
    },
    invite: {
        format: INVITE_WIDGET_FORMATS[0].key,
        text: 'создай мне челлендж',
        isTransparent: true,
        initialSize:{
            width: 360,
            height: 180
        }
    },
    challenge: {
        format: CHALLENGE_WIDGET_FORMATS[0].key,
        initialSize:{
            width: 240,
            height: 190
        }
    }
}

export const WIDGET_TYPES = [
    {
        key: 'notifications',
        name: 'Алерты и оповещения',
        icon: alertIcon,
        height: 22
    },
    {
        key: 'invite',
        name: 'Инвайт-виджет',
        icon: inviteIcon,
        height: 18
    },
    {
        key: 'challenge',
        name: 'Челленджи',
        icon: challengeIcon,
        height: 22
    }
]