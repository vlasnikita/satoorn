import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {clickOnPaymentMethodButton} from './testUtils';

import {AcceptChallenge}  from '.';
import { createInputEvent } from '../../../test/utils/commonTestUtils';

configure({ adapter: new Adapter() });

let wrapper

beforeEach(() => {
    wrapper =  shallow(<AcceptChallenge handleClose={() => {}} acceptingChallenge={{id: ''}}/> )
})

it('should accept 79121231223 phone number', () => {
    clickOnPaymentMethodButton(wrapper, 'QIWI-кошелёк')
    wrapper.find('#qiwiPhoneNumber').simulate('change', createInputEvent('79121231223'))
    wrapper.find('.Popup__submit').simulate('click')
    expect(wrapper.state().isErrors).toHaveLength(0)    
})


it('should not accept 89121231223 phone number', () => {
    clickOnPaymentMethodButton(wrapper, 'QIWI-кошелёк')
    wrapper.find('#qiwiPhoneNumber').simulate('change', createInputEvent('89121231223'))
    wrapper.find('.Popup__submit').simulate('click')
    expect(wrapper.state().isErrors).toHaveLength(1)    
})


