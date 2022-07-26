import  {  donateCaseTestData,
    myAcceptedChallengeData, myChallengeData,
    renderDefaultChallengeFeedItem,
    renderDefaultChallengePage,
} from './utils/challengeTestUtils';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';


configure({ adapter: new Adapter() });
jest.mock('Utils/metrics')
import { logDonateEvent, logShareEvent, logUserAction } from 'Utils/metrics';

beforeEach(() => {
    logDonateEvent.mockClear()
    logShareEvent.mockClear()
})

// it(`should send CHALLENGE_FEED donate button click event on donate in challenge feed item`, () => {
//     const challenge = renderDefaultChallengeFeedItem(undefined, donateCaseTestData)
//     challenge.find('#donateButton').simulate('click')
//     expect(logDonateEvent).toHaveBeenCalledWith('CHALLENGE_FEED', donateCaseTestData.profile.id)
// })

it(`should send CHALLENGE_FEED_SHARE_VK on vk share click in challenge feed item`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myAcceptedChallengeData)
    challenge.find('#shareVk').simulate('click')
    checkShareEventLoggedInFeed('VK', myAcceptedChallengeData.profile.id);
})

it(`should send CHALLENGE_FEED_SHARE_TWITTER on twitter share click in challenge feed item`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myAcceptedChallengeData)
    challenge.find('#shareTwitter').simulate('click')
    checkShareEventLoggedInFeed('TWITTER', myAcceptedChallengeData.profile.id)
})

it(`should send CHALLENGE_FEED_SHARE_TG on telegram share click in challenge feed item`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myAcceptedChallengeData)
    challenge.find('#shareTg').simulate('click')
    checkShareEventLoggedInFeed('TG', myAcceptedChallengeData.profile.id);
})

it(`should send CHALLENGE_FEED_SHARE_FB on facebook share click in challenge feed item`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myAcceptedChallengeData)
    challenge.find('#shareFb').simulate('click')
    checkShareEventLoggedInFeed('FB', myAcceptedChallengeData.profile.id)
})

it(`should send CHALLENGE_FEED_ACCEPT_CLICKED in challenge feed on accept`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myChallengeData)
    challenge.find('.Challenge__button_accept').simulate('click')
    expect(logUserAction).toHaveBeenCalledWith('CHALLENGE_FEED', 'ACCEPT', myChallengeData.profile.id)    
})

it(`should send CHALLENGE_FEED_REJECT_CLICKED in challenge feed on accept`, () => {
    const challenge = renderDefaultChallengeFeedItem(undefined, myChallengeData)
    challenge.find('.Challenge__button_cancel').simulate('click')
    expect(logUserAction).toHaveBeenCalledWith('CHALLENGE_FEED', 'REJECT', myChallengeData.profile.id)    
})


function checkShareEventLoggedInFeed(event, userId) {
    expect(logShareEvent).toHaveBeenCalledWith('CHALLENGE_FEED',event, userId);
}
