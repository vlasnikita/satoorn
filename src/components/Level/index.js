import React, { Component } from 'react';

import { ROUTE_LOGIN } from 'Constants/routes'

import ytIcon from 'Static/social/social-youtube.svg'
import twIcon from 'Static/social/social-twitch.svg'
import {logAuthButtonClick}  from 'Utils/metrics'

class Level extends Component {

    render() {
        return (
            <div className="Level">
                <div className="Level__title">
                    <p className="Level__titleText">ВХОД</p>
                    <span className="Level__titlePipe"/>
                </div>
                <a onClick={() => logAuthButtonClick('TWITCH')}
                    id="twitchLoginButton"
                    data-number={2}
                    href={`${ROUTE_LOGIN}/twitch`}
                    className="Level__block Level__block_button">
                    <img className='Level__icon' src={twIcon} alt="" />
                </a>
                <a onClick={() => logAuthButtonClick('GOOGLE')}
                     id="googleLoginButton"
                    data-number={3}
                    href={`${ROUTE_LOGIN}/google`}
                    className="Level__block Level__block_button">
                    <img className='Level__icon' src={ytIcon} alt="" />
                </a>
            </div>
        );
    }
}

export default Level;