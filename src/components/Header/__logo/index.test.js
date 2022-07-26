import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Logo from "./index";

it('should render Logo correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<Logo />)
    expect(wrapper).toMatchSnapshot()
})