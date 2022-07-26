import React, {Component} from 'react';

import {logAuthButtonClick} from "Utils/metrics";
import {ROUTE_LOGIN} from "Constants/routes";
import twIcon from "Static/social/social-twitch.svg";
import ytIcon from "Static/social/social-youtube.svg";

class Unregistred extends Component {

    render() {
        return (
            <div className="PopupUnregistred">
                <h1 className="Popup__title">Авторизация</h1>
                <div className="PopupUnregistred__list">
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
            </div>
        )
    }
}

export default Unregistred