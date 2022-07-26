import {templates} from 'Constants/templates'
import notifications from 'Mocks/notifications'
const streamers = require('Mocks/streamers');

export function createInputEvent(input) {
    return {target: {value: input}};
}

export const completePromises = () => new Promise(setImmediate);

export const defaultTestInitialState = {
    notifications: {
        notifications: notifications,
        loaded: false,
        loading: false
    },
    streamers: {
        streamers,
        activeStreamer: undefined,
        loading: false,
        loaded: false,
        searchTerm: ''
    },
    profile: {
        profile: {
            id: '5f108c57399c8300013dad42',
            authenticationSource: 'twitch',
            externalId: '204865822',
            externalProfileLink: null,
            externalPhotoLink: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/75305d54-c7cc-40d1-bb9c-91fbe85943c7-profile_image-300x300.png',
            email: null,
            login: 'vlasnikita',
            bio: null,
            walletAmount: 0,
            viewerCount: 0,
            followerCount: 0,
            challengeCount: 0,
            streamer: false,
            contacts: []
        },
        loaded: true
    },
    challenges: {
        redirectToChallenge: null,
        filter: {},
        activeStreamerFilter: {},
        activeStreamerChallenges: []
    },
    createChallenge: {
        challengeDraft: null
    },
    activeStreamer: {
        activeStreamer: {
            id: '5f108c57399c8300013dad42',
            authenticationSource: 'twitch',
            externalId: '204865822',
            externalProfileLink: null,
            externalPhotoLink: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/75305d54-c7cc-40d1-bb9c-91fbe85943c7-profile_image-300x300.png',
            email: null,
            login: 'vlasnikita',
            bio: null,
            walletAmount: 0,
            viewerCount: 0,
            followerCount: 0,
            challengeCount: 0,
            streamer: false,
            contacts: []
        },
        loading: false,
        loaded: false,
    },
    popup: {
        opened: false,
        type: undefined
    },
    unregistred: {
        opened: false
    },
    templates: {
        templates
    },
    transactions: {
        transactions: [],
        loading: false,
        loaded: false,
        activeTransaction: {
            id: null,
            inProgress: false,
            success: false
        }
    },
    configs: {
        settings: {
            value: {
                challengeAcceptDetailsConfirmed: true,
                challengeDonateDetailsConfirmed: true,
                serviceOnboardingConfirmed: true
            },
            loaded: true,
            loading: false
        },
        minPaymentAmount: {
            value: 30
        }
    },
    alert: {
        opened: false
    },
    widgetChallenge: {
        widgetChallenge: null,
        loading: false,
        loaded: false
    },

    copy() {
        return JSON.parse(JSON.stringify(this))
    },

    updateStreamers(updatedStreamers) {
        const updatedState = this.copy();
        Object.assign(updatedState.streamers, {streamers: updatedStreamers});
        return updatedState
    },

    updateProfile(updatedProfile) {
        return {...this.copy(), profile: {profile: updatedProfile}}
    },

    updateNotifications(updatedNotifications) {
        return {...this.copy(), notifications: {notifications: updatedNotifications}}
    },

    updateServiceOnboarding(value) {
        const copy = this.copy();
        copy.configs.settings.value.serviceOnboardingConfirmed = value;
        return copy
    },

    updateAlertVisibility(value){
        return {...this.copy(), alert: {opened: value}}
    }
};


