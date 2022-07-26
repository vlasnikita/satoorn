import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-specific-snapshot';
import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from "redux-mock-store";
import * as challengeTestUtils from '../../test/utils/challengeTestUtils';
import Challenge from './index';

configure({adapter: new Adapter()});

const mockStore = configureMockStore();
const initialState = {
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
    configs:{
        minPaymentAmount: {
            value: 30
        }
    }
};

it('renders correctly someone\'s Challenge', () => {

    function createNodeMock(element) {
        if (element.className === 'Challenge__description') {
            // This is your fake DOM node for <p>.
            // Feel free to add any stub methods, e.g. focus() or any
            // other methods necessary to prevent crashes in your components.
            return {};
        }
        // You can return any object from this method for any type of DOM component.
        // React will use it as a ref instead of a DOM node when snapshot testing.
        return element
    }

    const store = mockStore(initialState);
    const options = {createNodeMock};
    const challenge = require('Mocks/challenges')[0];
    const tree = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <Challenge
                    id={challenge.id}
                    challenge={challenge}
                />
            </Provider>
        </BrowserRouter>,
        options
    );

    expect(tree.toJSON()).toMatchSnapshot();
});


it('should renders correctly accepted challenge', () => {
    const challenge = challengeTestUtils.renderDefaultChallengeFeedItem(
        undefined,
        challengeTestUtils.myAcceptedChallengeData
    );
    expect(toJson(challenge)).toMatchSpecificSnapshot('./__specifics__/acceptedChallengeFeedItem.specific')
});

it('should renders correctly my challenge', () => {
    const challenge = challengeTestUtils.renderDefaultChallengeFeedItem(
        undefined,
        challengeTestUtils.myChallengeData
    );
    expect(toJson(challenge)).toMatchSpecificSnapshot('./__specifics__/myChallengeFeedItem.specific')
});