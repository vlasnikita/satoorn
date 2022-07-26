import React, { Component } from 'react';

import { checkIfNoOuterUIPage } from 'Utils/index'

class Layout extends Component {

    render() {
        if(checkIfNoOuterUIPage()) return <div>{this.props.children}</div>
        else return (
            <div className='Layout'>
                {this.props.children}
            </div>
        );
    }
}

export default Layout