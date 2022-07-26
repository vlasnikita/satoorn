import React from 'react';
import {shallow, configure} from 'enzyme';
import 'jest-specific-snapshot';
import Adapter from 'enzyme-adapter-react-16';
import {AcceptChallenge}  from '.';
import { ROUTE_CHALLENGES_APPLY_COMMISSION, ROUTE_CHALLENGES_ACCEPT} from 'Constants/routes';
import toJson from "enzyme-to-json";
import { clickOnPaymentMethodButton} from '../__acceptChallenge/testUtils'
import { createInputEvent } from '../../../test/utils/commonTestUtils';

const completePromises = () => new Promise(setImmediate);

configure({ adapter: new Adapter() });

const testChallengeId = 'someTestChallengeId'
const testAmounWithCommission = 200
const testMinimalCommission = 30

beforeEach(() => {
    fetch.resetMocks();
});

it('should invoke applyCommission with given challenge id and CARD payment method', () => {
    const wrapper =  shallow(<AcceptChallenge handleClose={() => {}} acceptingChallenge={{id: testChallengeId}}/> )
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
        `${ROUTE_CHALLENGES_APPLY_COMMISSION}?challengeId=${testChallengeId}&payoutType=CARD`,
        {"credentials": "include", "method": "GET"}
    )
})

it('should invoke applyCommission with given challenge id and QIWI payment method when switches to QIWI', () => {
    const wrapper =  shallow(<AcceptChallenge handleClose={() => {}} acceptingChallenge={{id: testChallengeId}}/> )
    const qiwiButton = clickOnPaymentMethodButton(wrapper, 'QIWI-кошелёк')
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenLastCalledWith(
        `${ROUTE_CHALLENGES_APPLY_COMMISSION}?challengeId=${testChallengeId}&payoutType=QIWI`,
        {"credentials": "include", "method": "GET"}
    )
})

it('should apply amountWithCommission and minimalCommission to popup state', async () => {
    mockCommissionResponse(
        {
         amountWithCommission: testAmounWithCommission, 
         minimalCommission: testMinimalCommission, 
         code: 'OK'
        }
    );
    const wrapper = rederDefaultPopup()
    await completePromises();
    checkStateMatchesExpected(wrapper, {minimalCommission: testMinimalCommission, amountWithCommission: testAmounWithCommission, code: 'OK'});
})

it(`should update amount amountWithCommission and minimalCommission after click on QIWI and back on CARD` , async () => {
    const cardCommission = {amountWithCommission: 300, minimalCommission: 40, code: 'OK'}
    const qiwiCommission = {amountWithCommission: 400, minimalCommission: 10, code: 'OK'}

    mockCommissionResponse(cardCommission)
    
    let wrapper = rederDefaultPopup()
    await completePromises();
    checkStateMatchesExpected(wrapper, cardCommission);

    mockCommissionResponse(qiwiCommission)
    clickOnPaymentMethodButton(wrapper, 'QIWI-кошелёк')
    await completePromises();
    checkStateMatchesExpected(wrapper, qiwiCommission);

    mockCommissionResponse(cardCommission)
    clickOnPaymentMethodButton(wrapper, 'Банковская карта')
    await completePromises();
    checkStateMatchesExpected(wrapper, cardCommission);
})

it(`should render correctly with selected CARD method and set minimal commission`, async () => {
    mockCommissionResponse({amountWithCommission: testAmounWithCommission, minimalCommission: testMinimalCommission, code: 'OK'});
    const wrapper = rederDefaultPopup()
    await completePromises();
    expect(toJson(wrapper)).toMatchSpecificSnapshot('./__specifics__/cardAndMinimalCommission.specific')
})

it(`should set state code to COMMISSION_OVERFLOW when received COMMISSION_OVERFLOW code`, async () => {
    mockCommissionResponse({amountWithCommission: 0, minimalCommission: 50, code: 'COMMISSION_OVERFLOW'});
    const wrapper = rederDefaultPopup()
    await completePromises();  
    checkStateMatchesExpected(wrapper, {minimalCommission: 50, amountWithCommission: 0, code: 'COMMISSION_OVERFLOW'});
})

it(`should renders correctly when received COMMISSION_OVERFLOW code`, async() => {
    mockCommissionResponse({amountWithCommission: 0, minimalCommission: 40, code: 'COMMISSION_OVERFLOW'});
    const wrapper = rederDefaultPopup()
    await completePromises();
    expect(toJson(wrapper)).toMatchSpecificSnapshot('./__specifics__/commissionIverflow.specific')
})

it('should invoke accept challenge with valid params for CARD', async() => {
    const validCardNumber = '1234 1234 1234 1234'
    mockCommissionResponse({amountWithCommission: testAmounWithCommission, minimalCommission: testMinimalCommission, code: 'OK'});
    
    const wrapper = rederDefaultPopup()
    await completePromises();
    fetch.resetMocks();

    
    wrapper.find('#cardNumber').simulate('change', createInputEvent(validCardNumber))
    wrapper.find('.Popup__submit').simulate('click')
    
    checkChallengeAcceptInvocation('CARD', validCardNumber.replace(/\W/g, ''));
})

it('should invoke accept challenge with valid params for QIWI', async() => {
    const phoneNumber = '79231231212'

     mockCommissionResponse({amountWithCommission: testAmounWithCommission, minimalCommission: testMinimalCommission, code: 'OK'});
    
    const wrapper = rederDefaultPopup()
    await completePromises();
    fetch.resetMocks();

    mockCommissionResponse({amountWithCommission: testAmounWithCommission, minimalCommission: testMinimalCommission, code: 'OK'});
    clickOnPaymentMethodButton(wrapper, 'QIWI-кошелёк')
    await completePromises();
    fetch.resetMocks();

    wrapper.find('#qiwiPhoneNumber').simulate('change', createInputEvent(phoneNumber))
    wrapper.find('.Popup__submit').simulate('click')

    checkChallengeAcceptInvocation('QIWI', phoneNumber);
})

function checkChallengeAcceptInvocation(type, value) {
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(
        expect.stringContaining(`${ROUTE_CHALLENGES_ACCEPT}?challengeId=${testChallengeId}&type=${type}&value=${value}&operationKey=`),
        expect.anything()
    );
}

function checkStateMatchesExpected(wrapper, expectedState) {
    expect(wrapper.state().amountWithCommission).toBe(expectedState.amountWithCommission);
    expect(wrapper.state().minimalCommission).toBe(expectedState.minimalCommission);
    expect(wrapper.state().code).toBe(expectedState.code)
}

function rederDefaultPopup() {
    return shallow(<AcceptChallenge handleShowAlert={()=> {}} handleClose={() => { } } acceptingChallenge={{ id: testChallengeId }} />);
}

function mockCommissionResponse(response) {
    fetch.once(JSON.stringify(response));
}
