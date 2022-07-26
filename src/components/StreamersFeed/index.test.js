import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'jest-specific-snapshot';
import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureMockStore from "redux-mock-store";
import {defaultTestInitialState} from '../../test/utils/commonTestUtils';
import StreamersFeed from './index';

jest.mock('Utils/metrics');

configure({adapter: new Adapter()});
const streamers = require('Mocks/streamers');
const mockStore = configureMockStore();
const streamer = streamers[0];

it('renders correctly', () => {
    const store = mockStore(defaultTestInitialState);
    const tree = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <StreamersFeed
                />
            </Provider>
        </BrowserRouter>
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly not empty streamers feed limited by scroll position', () => {
    let parent = prepareParent();

    const store = mockStore(defaultTestInitialState);
    act(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <StreamersFeed/>
                </Provider>
            </BrowserRouter>,
            parent);
    });

    expect(parent.querySelectorAll('.Streamer').length).toEqual(defaultTestInitialState.streamers.streamers.length);

    cleanupParent(parent);
});


function clickOnGoToProfileButton(feed) {
    feed.findWhere(node => node.type() === 'a'
        &&
        node.hasClass('Button')
    ).simulate('click');
}

function cleanupParent(parent) {
    unmountComponentAtNode(parent);
    parent.remove();
}

function prepareParent() {
    let parent = document.createElement("div");
    document.body.appendChild(parent);
    return parent;
}

