import 'jest-specific-snapshot';
import {  defaultTestInitialState } from 'Test/utils/commonTestUtils';
import { renderHeader } from './headerTestUtils';
import toJson  from 'enzyme-to-json';

it(`should render onbording if service onboarding is not confirmed`, () => {
    expect(toJson(renderHeader(defaultTestInitialState.updateServiceOnboarding(false))))
            .toMatchSpecificSnapshot('./__specifics__/headerWithOnboarding.specific')
})

it(`should render onbording if service onboarding is not confirmed`, () => {
    expect(toJson(renderHeader(defaultTestInitialState))).toMatchSpecificSnapshot('./__specifics__/headerWithoutOnboarding.specific')
})