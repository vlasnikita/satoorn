import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react'
import Policy from './index'

jest.mock('Static/policy.pdf', () => ({ /* fake module */ }))

it('should render auth error page correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<Policy />)
    expect(wrapper).toMatchSnapshot()
})