import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import UserNavbar from "./index";

it('should render UserNavbar correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<UserNavbar />)
    expect(wrapper).toMatchSnapshot()
})