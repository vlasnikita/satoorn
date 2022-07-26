import {ROUTE_NOTIFICATIONS_READ} from 'Constants/routes';
import toJson from "enzyme-to-json";
import 'jest-specific-snapshot';
import notifications from 'Mocks/notifications';
import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import loginIcon from 'Static/login.svg';
import {logUserAction} from 'Utils/metrics';
import {completePromises, defaultTestInitialState} from '../../../test/utils/commonTestUtils';
import {renderCharacter, renderCharacterPassingStore} from '../headerTestUtils';
import Character from "../__character";

jest.mock('Utils/metrics')

const mockStore = configureMockStore();
let container = null

beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
    fetch.resetMocks();
});
afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders authorized <Character>', () => {
    act(() => {
        render(
            <Provider store={mockStore(defaultTestInitialState)}>
                <Character />
            </Provider>,
            container);
    });
    expect(container.querySelector('.Character__avatarContainer img').src).toBe(defaultTestInitialState.profile.profile.externalPhotoLink);
});

it('toggles & renders <Notifications>', () => {
    act(() => {
        render(
            <Provider store={mockStore(defaultTestInitialState)}>
                <Character />
            </Provider>,
        container);
    });

    const bellIcon = document.querySelector('.Character__bellImage')
    act(() => {
        bellIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.querySelector('.Notifications__feed').children.length).toBe(notifications.length);

    act(() => {
        container.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(document.querySelector('.Notifications')).toBe(null);
});

it('renders unauthorized <Button>', () => {
    const state = defaultTestInitialState.updateProfile({});

    act(() => {
        render(
            <Provider store={mockStore(state)}>
                <Character />
            </Provider>,
            container);
    });

    expect(document.querySelectorAll('.Character .Button')).toHaveLength(1);

})

it('should log NOTIFICATIONS_CLOSED when clicks on opened notifications', () => {
    const character = renderCharacter(defaultTestInitialState)
     character.find('.Character__bell_unread').simulate('click')
     expect(logUserAction).toHaveBeenCalledWith('NOTIFICATIONS', 'OPENED', defaultTestInitialState.profile.profile.id)
})

it('should log NOTIFICATIONS_OPENDED when clicks on closed notifications', () => {
    const character = renderCharacter(defaultTestInitialState)
   
    character.find('.Character__bell_unread').simulate('click')
    character.find('.Character__bell_opened').simulate('click')

    expect(logUserAction).toHaveBeenCalledWith('NOTIFICATIONS', 'CLOSED', defaultTestInitialState.profile.profile.id)
})

it(`should read notifications with valid request parameters`, async () => {
    const character = renderCharacter(defaultTestInitialState)
    const idsToDelete = defaultTestInitialState.notifications.notifications.map((notification) => notification.id)
    character.find('.Character__bell_unread').simulate('click')

    await completePromises()

    expect(idsToDelete.length).toBeGreaterThan(0)
    expect(fetch).toHaveBeenCalledWith(`${ROUTE_NOTIFICATIONS_READ}`, {
        method: 'PUT',
        credentials: "include",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(idsToDelete)
    }
)
})


it(`should render correctly bell with read notifications`, () => {
    const readNotifications = [...notifications];

    const character = renderCharacter(defaultTestInitialState.updateNotifications(
        readNotifications.map(notification => {
            return {...notification, read: true}}
        )
    ))
    
    expect(toJson(character)).toMatchSpecificSnapshot('./__specifics__/characterWithReadNotificationsBell.specific')

})

it(`should reload notifications after click on bell`, () =>  {
    const store = mockStore(defaultTestInitialState)
    const character = renderCharacterPassingStore(store)

    character.find('.Character__bell_unread').simulate('click')
    character.find('.Character__bell_opened').simulate('click')

    const lastAction = store.getActions()[store.getActions().length - 1]

    expect(lastAction).toEqual({"type":"GET_NOTIFICATIONS","callAPI":"/api/notifications"})
})

