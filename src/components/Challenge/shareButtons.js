import React, { Component } from 'react';

export default class ShareButton extends Component {

    constructor(props) {
        super(props)
        this.shareTemplate = props.shareTemplate
    }

   

    render() {
        return (
            <a
                id={this.props.id}
                className="Challenge__shareIcon"
                target="_blank"
                href={this.shareTemplate.apply(this.props.challengeId, this.props.challengeTitle)}>
                <img src={this.shareTemplate.imgSrc} 
                alt={this.shareTemplate.alt} 
                />
            </a>
        )
    }

}