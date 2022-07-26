import React, { Component } from 'react';
import policy from 'Static/policy.pdf'

class Policy extends Component {

    render() {
        return (
            <iframe
                src={policy}
                frameBorder="0"
                style={{
                    height: '100vh',
                    width: '100vw'
                }}
            />
        );
    }
}

export default Policy