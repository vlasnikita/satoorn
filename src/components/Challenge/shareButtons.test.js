import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-specific-snapshot';
import React from 'react';
import { FB_TEMPLATE, TG_TEMPLATE, TWITTER_TEMPLATE, VK_TEMPLATE } from '../../constants/share_links';
import ShareButton from './shareButtons';

configure({ adapter: new Adapter() })

it('should renders correctly telegram share button', () => {
    expect(
        toJson(renderDefaultShareButton(TG_TEMPLATE))
    )
    .toMatchSpecificSnapshot('./__specifics__/tgShareButton.specific')
})

it('should renders correctly vk share button', () => {
    expect(
        toJson(renderDefaultShareButton(VK_TEMPLATE))
    )
    .toMatchSpecificSnapshot('./__specifics__/vkShareButton.specific')
})

it('should renders correctly twitter share button', () => {
    expect(
        toJson(renderDefaultShareButton(TWITTER_TEMPLATE))
    )
    .toMatchSpecificSnapshot('./__specifics__/twitterShareButton.specific')
})

it('should renders correctly facebook share button', () => {
    expect(
        toJson(renderDefaultShareButton(FB_TEMPLATE))
    )
    .toMatchSpecificSnapshot('./__specifics__/fbShareButton.specific')
})

const renderDefaultShareButton = (template) => {
    return shallow(<ShareButton 
                id="someId"
                challengeId="someChallengeId"
                challengeTitle="someChallengeTitle"
                shareTemplate={template}
            />)
}