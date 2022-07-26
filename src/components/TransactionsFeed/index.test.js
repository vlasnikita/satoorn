import React from 'react'
import TransactionsFeed from './index'
import renderer from 'react-test-renderer'
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
const initialState = {
    transactions: {
        transactions: require('Mocks/transactions'),
        loading: false,
        loaded: false,
    },
    profile: {
        profile: require('Mocks/streamers')[0],
        loaded: true
    }
}
const store = mockStore(initialState);

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <TransactionsFeed />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});