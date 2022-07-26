import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react'
import NotFound from '../NotFound'

it('should render not found page correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<NotFound />)
    expect(wrapper).toMatchSnapshot()
})