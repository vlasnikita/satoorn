import React from 'react'
import 'jest-specific-snapshot'
import renderer from 'react-test-renderer'
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import {unmountComponentAtNode} from "react-dom";
import Popup from "./index";
import POPUP_TYPE from "Constants/popup_type";

const mockStore = configureMockStore();

const initialState = {
    popup: {
        opened: false,
        type: undefined
    }
}

it('renders correctly', () => {
    const store = mockStore(initialState);
    const tree = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <Popup/>
            </Provider>
        </BrowserRouter>
    )

    expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly Popup.HELP', () => {
    const initialState2 = {
        popup: {
            opened: false,
            type: POPUP_TYPE.HELP
        }
    }
    const store2 = mockStore(initialState2);
    const tree = renderer
        .create(
            <Provider store={store2}>
                <Popup />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSpecificSnapshot('./__specifics__/help_popup_renders.specific');
});

it('renders correctly Popup.ACCEPT_DISCLAIMER', () => {
    const initialState3 = {
        popup: {
            opened: false,
            type: POPUP_TYPE.ACCEPT_DISCLAIMER
        }
    }
    const store3 = mockStore(initialState3);
    const tree = renderer
        .create(
            <Provider store={store3}>
                <Popup />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSpecificSnapshot('./__specifics__/accept_popup_renders.specific');
});