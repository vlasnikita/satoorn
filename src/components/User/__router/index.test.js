import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import UserRouter from "./index";

it('should render UserRouter correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<UserRouter match={{params: {username: 'some Login'}}} />)
    expect(wrapper).toMatchSnapshot()
})