import React, { Component, Fragment } from "react";
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';

import iconTwitch from "Static/social-tw.svg";
import iconYt from "Static/social-yt.svg";

class StreamerContacts extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.documentTitle) document.title = this.props.documentTitle
    }

    resolveIcon = (url) => {
        if (url.includes("twitch")) return iconTwitch
        else return iconYt
    }

    resolvePlatform = () => {
        if (this.props.activeStreamer.authenticationSource === ("twitch")) return (
            <TwitchEmbed
                channel={this.props.activeStreamer.login}
                id={this.props.activeStreamer.login}
                theme="dark"
                height="60vh"
                width="70vw"
                muted
            />
        )
        else return (
            <a
                className="StreamerContacts__contact"
                onClick={(event => event.stopPropagation())}
                target="_blank"
                href={"https://" + this.props.activeStreamer.contacts[0]}
            >
                <img
                    src={iconYt}
                    alt="YouTube"
                    className="StreamerContacts__icon"
                />
                <p className="StreamerContacts__platform">YouTube</p>
            </a>
        )
    }

    render() {
        if (Array.isArray(this.props.activeStreamer.contacts) && this.props.activeStreamer.contacts.length > 0) {
            return (
                <div className="StreamerContacts">
                    {this.resolvePlatform()}
                </div>
            )
        }
        return null;
    }
}

export default StreamerContacts