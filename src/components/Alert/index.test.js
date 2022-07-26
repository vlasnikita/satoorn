import 'jest-specific-snapshot';
import {  defaultTestInitialState } from '../../test/utils/commonTestUtils';
import { renderHeader } from '../Header/headerTestUtils';
import toJson  from 'enzyme-to-json';

it(`should render Alert message`, () => {
    expect(toJson(renderHeader(defaultTestInitialState.updateAlertVisibility(true))))
        .toMatchSpecificSnapshot('./__specifics__/alertOpened.specific')
})

it(`should not render Alert message`, () => {
    expect(toJson(renderHeader(defaultTestInitialState))).toMatchSpecificSnapshot('./__specifics__/alertHidden.specific')
})