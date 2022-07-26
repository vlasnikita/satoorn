import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import React from 'react'
import 'jest-specific-snapshot'
import HowItWorks from './index'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {  defaultTestInitialState } from 'Test/utils/commonTestUtils';
import toJson  from 'enzyme-to-json';

configure({ adapter: new Adapter() })
const mockStore = configureMockStore();
jest.mock('Static/how-it-works.pdf', () => ({ /* fake module */ }))

it('renders correctly', () => {
    const tree = mount(
        <BrowserRouter keyLength={0}>
            <Provider store={mockStore(defaultTestInitialState)}>
                <HowItWorks />
            </Provider>
        </BrowserRouter>
    );
    expect(toJson(tree)).toMatchSnapshot();
});