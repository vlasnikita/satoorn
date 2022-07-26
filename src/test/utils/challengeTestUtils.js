import {Challenge} from 'Components/Challenge';
import {ChallengePage} from 'Components/ChallengePage';
import CHALLENGE_STATE from "Constants/challenge_states";
import {shallow} from 'enzyme';
import React from 'react';


export const myChallengeData  = {
    configs: {
        settings: {
            value:{
                challengeDonateDetailsConfirmed: true,
                challengeAcceptDetailsConfirmed: true      
            },
        },
        minPaymentAmount: {value: 25}
    },  
    profile: {
        id: "some id",
        login: "someLogin"
    },
    activeChallenge: {
        id: "some id",
        donationAmount: 100,
        streamerLogin: "someLogin",
        state: CHALLENGE_STATE.CREATED,
        description: "someDescription",
        title: "someTitle",
        donators: {}
    },
    isActiveChallengeLoaded: true,
    isActiveChallengeLoading: false
};

export const donateCaseTestData = {};
Object.assign(donateCaseTestData, myChallengeData);
Object.assign(donateCaseTestData, {profile: {id: 'another id', login: 'another login'}});

export const myAcceptedChallengeData = {};
Object.assign(myAcceptedChallengeData, myChallengeData);
Object.assign(myAcceptedChallengeData, {
    activeChallenge: {
        id: myChallengeData.activeChallenge.id,
        donationAmount: myChallengeData.activeChallenge.donationAmount,
        streamerLogin: myChallengeData.activeChallenge.streamerLogin,
        state: CHALLENGE_STATE.ACCEPTED,
        description: myChallengeData.activeChallenge.description,
        title: myChallengeData.activeChallenge.title,
        donators: {}
    }
});

export const donators = {
    donator1: {linkToAvatar: "http://avatar.jpg", amount: 200},
    donator2: {linkToAvatar: "http://avatar.jpg", amount: 150},
    donator3: {linkToAvatar: "http://avatar.jpg", amount: 100},
    donator4: {linkToAvatar: "http://avatar.jpg", amount: 50},
    donator5: {linkToAvatar: "http://avatar.jpg", amount: 25}
};

export const myChallengeWithDonators = {};
Object.assign(myChallengeWithDonators, JSON.parse(JSON.stringify(myChallengeData)));
myChallengeWithDonators.activeChallenge.donators = donators;
   
   export function renderDefaultChallengePage(handleOpenPopupSpy = () => {}, data=myChallengeData) {
        return shallow(
            <ChallengePage
                profile={data.profile}
                activeChallenge={data.activeChallenge}
                isActiveChallengeLoaded={true}
                configs={data.configs}
                match={{ params: { challengeId: "" } }}
                handleGetActiveChallenge={jest.fn()}
                handleUnsetRedirectToChallenge={jest.fn()}
                handleResetActiveStreamer={jest.fn()}
                handleShowAlert={jest.fn()}
                handleOpenPopup={handleOpenPopupSpy} />);
    }
    
 export function renderDefaultChallengeFeedItem(handleOpenPopupSpy = () => {}, data=myChallengeData) {
        return shallow(
            <Challenge
                configs={data.configs}
                profile={data.profile}
                id={data.activeChallenge.id}
                challenge={data.activeChallenge}
                handleShowAlert={jest.fn()}
                handleOpenPopup={handleOpenPopupSpy} />);
    }
    