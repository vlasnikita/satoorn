import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react'
import AuthErrorPage from '../Error'

it('should render auth error page correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<AuthErrorPage />)
    expect(wrapper).toMatchSnapshot()
})