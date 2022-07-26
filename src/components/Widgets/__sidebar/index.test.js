import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import WidgetsSidebar from "./index";

it('should render WidgetsSidebar correctly', () => {
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<WidgetsSidebar />)
    expect(wrapper).toMatchSnapshot()
})