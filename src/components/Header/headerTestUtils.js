import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import React from 'react';
import { Provider } from "react-redux";
import Character from './__character';
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from 'react-router-dom';
import Header from 'Components/Header';

configure({ adapter: new Adapter() })
const mockStore = configureMockStore();

export function renderHeader(state) {
    return mount(
     <BrowserRouter keyLength={0}>
        <Provider store={mockStore(state)}>
            <Header />
        </Provider>
    </BrowserRouter>    
    );
}

export function renderCharacter(state) {
    return renderCharacterPassingStore(mockStore(state));
}
export function renderCharacterPassingStore(store) {
    return mount(
        <Provider store={store}>
            <Character />
        </Provider>
    );
}