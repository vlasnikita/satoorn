import React from 'react'
import 'jest-specific-snapshot'
import renderer from 'react-test-renderer'
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import Templates from './index'
import {unmountComponentAtNode} from "react-dom";
import {TEMPLATE_FILTERS} from "Constants/filters";

const mockStore = configureMockStore();

const allTemplates = require('Mocks/templates')
const initialState = {
    templates: {
        allTemplates,
        templates: allTemplates.filter(template => template.type === TEMPLATE_FILTERS[0].key),
        filter: TEMPLATE_FILTERS[0]
    }
}

it('renders correctly', () => {
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
    const options = {createNodeMock}
    const tree = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <Templates
                />
            </Provider>
        </BrowserRouter>,
        options
    )

    expect(tree.toJSON()).toMatchSnapshot();
});