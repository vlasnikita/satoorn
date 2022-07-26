import { configure, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-specific-snapshot';
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from "redux-mock-store";
import CreateChallenge from './index';
import {defaultTestInitialState, createInputEvent, completePromises} from '../../test/utils/commonTestUtils';

jest.mock('Utils/metrics')
jest.mock('Utils/index')
import {openPaymentWidget} from 'Utils/index';
import { logUserAction } from 'Utils/metrics';

configure({ adapter: new Adapter() })

const mockStore = configureMockStore();

beforeEach(() => {
    fetch.resetMocks();
});

it('renders correctly', () => {
    expect(toJson(renderDefaultCreateChallengeComponent())).toMatchSnapshot();
});

it('should log create challenge event with CHALLENGE_PAGE context and given userId', () => {
    const createChallenge = renderDefaultCreateChallengeComponent()
    createChallenge.find('#CreateChallenge__button').simulate('click')
    expect(logUserAction)
        .toHaveBeenCalledWith('CREATE_CHALLENGE_PAGE', 'CREATE_CHALLENGE', defaultTestInitialState.profile.profile.id)
})


it('should open payment widget with valid input arguments when creates challenge', async () => {
    const testChallengeId = "someChallengeId";
    const testTransactionId = "someTransactionId";
    const testAmount = "500"
    const testTitle = "some challenge title";

    fetch.once(JSON.stringify(
         {
            challengeId: testChallengeId,
            code: "OK",
            transactionId: testTransactionId
          }
    ));


    const createChallenge = renderDefaultCreateChallengeComponent(
        mockStore(defaultTestInitialState)
    )

    createChallenge.find("#title").simulate('change', createInputEvent(testTitle))
    createChallenge.find("#description").simulate('change', createInputEvent("some challenge description"))
    createChallenge.find("#newBidAmount").simulate('change', createInputEvent(testAmount))
    
    await completePromises()
    
    createChallenge.find('#CreateChallenge__button').simulate('click')  

    await completePromises()

    expect(openPaymentWidget).toHaveBeenCalledWith(
        testAmount, 
        testTransactionId,
        `Создание челленджа ${testTitle}`,
        false,
        testChallengeId,
        {donationAmount: testAmount},
        'vlasnikita'
    )
})

function renderDefaultCreateChallengeComponent(store = mockStore(defaultTestInitialState)) {
    return mount(
        <BrowserRouter>
            <Provider store={store}>
                <CreateChallenge />
            </Provider>
        </BrowserRouter>
    );
}

