import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {logAuthButtonClick} from 'Utils/metrics';
import Level from '.';

configure({ adapter: new Adapter() });

jest.mock('Utils/metrics')

it('should send TWITCH_LOGIN_BUTTON_CLICKED event on twitch button click', () => {
    const level = shallow(<Level/>)
    console.log('levelas')
    console.log(level)
    level.find('#twitchLoginButton').simulate('click')
    
    expect(logAuthButtonClick).toBeCalledWith('TWITCH')
})

it('should send GOOGLE_LOGIN_BUTTON_CLICKED event on twitch button click', () => {
    const level = shallow(<Level/>)
    level.find('#googleLoginButton').simulate('click');
    
    expect(logAuthButtonClick).toBeCalledWith('GOOGLE')
})