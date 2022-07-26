import POPUP_TYPE from "Constants/popup_type";
import {ROUTE_CHALLENGES} from 'Constants/routes';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    donateCaseTestData,
    donators,
    myChallengeData,
    myChallengeWithDonators,
    renderDefaultChallengeFeedItem,
    renderDefaultChallengePage
} from './utils/challengeTestUtils';
import {completePromises, createInputEvent} from './utils/commonTestUtils';


configure({ adapter: new Adapter() });
jest.mock('Utils/metrics');
jest.mock('Utils/index');

beforeEach(() => {
    fetch.resetMocks();
});

it('should call handleOpenPopup with given challenge id and donation amount on challenge feed item', () => {

    const handleOpenPopupSpy = jest.fn();
    const challenge = renderDefaultChallengeFeedItem(handleOpenPopupSpy);
    challenge.find('.Challenge__button_accept').simulate('click');
    expect(handleOpenPopupSpy).toHaveBeenLastCalledWith(
        POPUP_TYPE.ACCEPT_CHALLENGE,
         {id: myChallengeData .activeChallenge.id, amount: myChallengeData.activeChallenge.donationAmount}
    )
});

// it(`should invoke donateChallenge with given data parametres on challenge feed item`, async () => {
//     const challenge = renderDefaultChallengeFeedItem(undefined, donateCaseTestData);
//     const amount = 1111;
//     challenge.find('.Challenge__input').simulate('change', createInputEvent(amount));
//     challenge.find('#donateButton').simulate('click');

//     await completePromises();

//     checkDonateRequestParams(amount);
// });

it(`should render all given donators in challenge page`, () => {
    expect(renderDefaultChallengePage(undefined, myChallengeWithDonators)
        .find('.ChallengePage__donatorsItem'))
        .toHaveLength(Object.entries(donators).length)
});

function checkDonateRequestParams(amount) {
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(
        `${ROUTE_CHALLENGES}donate?amount=${amount}&id=${donateCaseTestData.activeChallenge.id}&operationKey=MOCKED_HASH`,
        { "credentials": "include", "method": "POST" }
    );
}
