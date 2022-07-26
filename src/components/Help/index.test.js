import React from 'react'
import 'jest-specific-snapshot'
import renderer from 'react-test-renderer'
import Help from './index'

it('renders correctly', () => {
    const tree = renderer.create(
        <Help />
    )
    expect(tree.toJSON()).toMatchSnapshot();
});