import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import UserPage from "./index";

it('should render UserPage correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<UserPage />)
    expect(wrapper).toMatchSnapshot()
})