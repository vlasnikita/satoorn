import React from 'react'
import 'jest-specific-snapshot'
import renderer from 'react-test-renderer'
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import FiltersBar from './index'
import { FiltersBarPure } from './index'
import {unmountComponentAtNode} from "react-dom";
import Adapter from 'enzyme-adapter-react-16'
import {configure, mount, shallow} from "enzyme";
import {CHALLENGE_FILTERS} from "Constants/filters";

configure({ adapter: new Adapter() })

const mockStore = configureMockStore();
const initialState = {
    challenges: {
        challenges: require('Mocks/challenges'),
        filter: CHALLENGE_FILTERS[0],
        activeStreamerChallenges: require('Mocks/challenges'),
        activeStreamerFilter: CHALLENGE_FILTERS[0],
        searchTerm: '',
        loading: false,
        loaded: false
    },
    activeStreamer: {
        activeStreamer: {
            "id": "1",
            "streamerLogin": "user_1",
            "streamerPhotoLink": "https://images-cdn.9gag.com/photo/anbZVN0_700b.jpg",
            "imageId": "overwatch_stub_id",
            "title": "some title",
            "description": "Some default description Some default description Some default description Some default description Some default description Some default description Some default description Some default description Some default description Some default description ",
            "donationAmount": 78,
            "commissionAmount": 50,
            "donatedPersonCount": 10,
            "viewCount": 200,
            "state": "CREATED",
            "startedAt": "14-07-2020 21:00 MSK",
            "remainedDaysCount": 6,
            "streamerMessage": null
        },
        loading: false,
        loaded: false,
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
    }
}

const store = mockStore(initialState);
let container = null

beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders correctly FiltersBar', () => {
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

    const options = {createNodeMock}
    const tree = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <FiltersBar
                />
            </Provider>
        </BrowserRouter>,
        options
    )

    expect(tree.toJSON()).toMatchSnapshot();
});