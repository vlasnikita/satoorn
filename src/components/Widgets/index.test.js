import 'jest-specific-snapshot';
import {  defaultTestInitialState } from '../../test/utils/commonTestUtils';

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import React from 'react';
import configureMockStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Widgets from "Components/Widgets";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() })
const mockStore = configureMockStore();


it('renders correctly', () => {
    const store = mockStore(defaultTestInitialState);
    const tree = shallow(
        <BrowserRouter>
            <Provider store={store}>
                <Widgets />
            </Provider>
        </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
});