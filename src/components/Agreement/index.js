import React, { Component } from 'react';
import agreement from 'Static/agreement.pdf'

class Agreement extends Component {

    render() {
        return (
            <iframe
                src={agreement}
                frameBorder="0"
                style={{
                    height: '100vh',
                    width: '100vw'
                }}
            />
        );
    }
}

export default Agreement