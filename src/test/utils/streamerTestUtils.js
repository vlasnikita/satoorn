import {defaultTestInitialState} from "./commonTestUtils";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import StreamersFeed from "Components/StreamersFeed";
import React from "react";
import configureMockStore from "redux-mock-store";
import User from "Components/User";

const mockStore = configureMockStore();

export const renderDefaultStreamersFeed = (state = defaultTestInitialState) => mount(
    <BrowserRouter>
        <Provider store={mockStore(state)}>
            <StreamersFeed/>
        </Provider>
    </BrowserRouter>);

export const renderDefaultStreamerPage = (state = defaultTestInitialState) => mount(
    <BrowserRouter>
        <Provider store={mockStore(state)}>
            <User/>
        </Provider>
    </BrowserRouter>
)