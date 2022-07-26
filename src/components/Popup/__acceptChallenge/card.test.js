import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AcceptChallenge}  from '.';
import { createInputEvent } from '../../../test/utils/commonTestUtils';

configure({ adapter: new Adapter() });

let wrapper

beforeEach(() => {
    wrapper =  shallow(<AcceptChallenge handleClose={() => {}} acceptingChallenge={{id: ''}}/> )
})

it('should accept 16 digit card number', () => {
    wrapper.find('#cardNumber').simulate('change', createInputEvent('1234 1234 1234 1234'))
    wrapper.find('.Popup__submit').simulate('click')
    expect(wrapper.state().isErrors).toHaveLength(0)    
})

it('should not accept 10 digits card number', () => {
    wrapper.find('input').simulate('change', createInputEvent('1234 1234 12'))
    wrapper.find('.Popup__submit').simulate('click')
    expect(wrapper.state().isErrors).toHaveLength(1)  
})

it('should accept 18 digit card number', () => {
    wrapper.find('#cardNumber').simulate('change', createInputEvent('1234 1234 1234 1234 12'))
    wrapper.find('.Popup__submit').simulate('click')
    expect(wrapper.state().isErrors).toHaveLength(0)    
})


