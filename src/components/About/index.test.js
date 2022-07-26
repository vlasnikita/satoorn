import React from 'react'
import 'jest-specific-snapshot'
import renderer from 'react-test-renderer'
import About from './index'

it('renders correctly', () => {
    const tree = renderer.create(
        <About />
    )
    expect(tree.toJSON()).toMatchSnapshot();
});