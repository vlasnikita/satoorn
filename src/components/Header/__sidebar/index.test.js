import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from "redux-mock-store";
import { defaultTestInitialState } from '../../../test/utils/commonTestUtils';
import Sidebar from "../__sidebar";
jest.mock('Utils/metrics')
import { logUserAction } from '../../../utils/metrics';


configure({ adapter: new Adapter() })
const mockStore = configureMockStore();

it('should send SIDEBAR_ITEM_CLICKED for menu items', () => {
    const sidebar = renderSidebar()
     const itemLinks = ['/streamers', '/challenges', '/about', '/help', `/${defaultTestInitialState.profile.profile.login}`]
     itemLinks.forEach((itemLink) =>{
        const sidebarItem = getSidebarItem(sidebar, itemLink)

        sidebarItem.simulate('click')
        expect(logUserAction).toHaveBeenCalledWith(
            'SIDEBAR_ITEM', 
            sidebarItem.prop('eventContext'), 
            defaultTestInitialState.profile.profile.id
        )
    })
})


function getSidebarItem(sidebar, href) {
    return sidebar.findWhere(node => node.type() == 'a' && node.prop('href') == href).at(0);
}

function renderSidebar(state = defaultTestInitialState) {
    return mount(
        <BrowserRouter>
            <Provider store={mockStore(state)}>
                <Sidebar location={{ pathname: '/challenges' }} />
            </Provider>
        </BrowserRouter>);
}

