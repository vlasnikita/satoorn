import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react'
import Agreement from './index'

it('should render auth error page correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<Agreement />)
    expect(wrapper).toMatchSnapshot()
})