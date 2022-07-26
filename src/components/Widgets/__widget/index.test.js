import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { WIDGET_SETTINGS_DEFAULTS, WIDGET_TYPES } from 'Constants/widgets'
import Widget from "./index";

it('should render Widget correctly', () => {
    const props = {
        type: WIDGET_TYPES[0].key,
        settings: WIDGET_SETTINGS_DEFAULTS[WIDGET_TYPES[0].key],
        position: {x: 0, y: 0},
        size: WIDGET_SETTINGS_DEFAULTS[WIDGET_TYPES[0].key].initialSize,
        activeStreamer: {
            login: 'some Login'
        }
    }
    const renderer = new ShallowRenderer();
    const wrapper = renderer.render(<Widget {...props} />)
    expect(wrapper).toMatchSnapshot()
});