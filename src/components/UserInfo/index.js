import React, {Component, Fragment} from "react";
import {Link } from "react-router-dom";

import UserInfoIcon from './__icon'

import createPipeIcon from 'Static/user/user-create-pipe.svg'

let timer

class UserInfo extends Component {

    getCTAButtonOrTitle = () => {
        if(this.props.feed) return null;
        return (
            <Fragment>
                <Link
                    id="Streamer__createChallenge"
                    className="User__button"
                    to={`/${this.props.streamer.login}/create`}
                >
                    <UserInfoIcon/>
                    <p className="User__buttonText">Создать челлендж</p>
                </Link>
                <h1 className="User__createTitle">Новый челлендж</h1>
            </Fragment>
        )
    }

    render() {
        const { externalPhotoLink, login, challengeCount } = this.props.streamer
        return (
            <div className="UserInfo">
                <img src={createPipeIcon} className="UserInfo__avatarPipe" />
                <img src={externalPhotoLink} alt="N/A" className="UserInfo__avatar"/>
                <div className="UserInfo__rightColumn">
                    <h4 className="UserInfo__login">{login}</h4>
                    <div className="UserInfo__details">
                        {challengeCount > 0 &&
                        <div className="UserInfo__crumb">
                            <p className="UserInfo__crumb__text">{`${challengeCount} челленджей`}</p>
                        </div>
                        }
                    </div>
                </div>
                {this.getCTAButtonOrTitle()}
            </div>
        )
    }
}

export default UserInfo