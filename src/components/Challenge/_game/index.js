import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {Challenge} from 'Components/Challenge';
import {updateChallenge} from "Actions/challenges";
import {getVenzel} from "Utils/challenge_tiers";
import {closePopup, openPopup} from "Actions/popup";
import {showAlert} from "Actions/alert";
import {setWidgetChallenge} from "Actions/widgetChallenge";

// const API = 'https://api.rawg.io/api/games?page_size=5&page=1&key=163b014b0d7b4fe4b49c79f77ec56157&ordering=-rating&search='

export class ChallengeGame extends Challenge {
    constructor(props) {
        super(props)
    }

    render() {
        const { donationAmount, title } = this.props.challenge
        return (
            <div className="Challenge_game">
                <span className="Challenge_game__number">{this.props.number}</span>
                <div className="Challenge__price">
                    {getVenzel(donationAmount)}
                    <p className={`Challenge__priceText Challenge__priceText_t${this.props.number}`}>
                        {('' + donationAmount).split(/\D/).join('')}
                        <span className="Challenge__priceText_currency">₽</span>
                    </p>
                </div>
                <p className="Challenge_game__title">{title}</p>
                {this.getActions()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    configs: state.configs,
    activeStreamer: state.activeStreamer.activeStreamer
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge)),
        handleClosePopup: () => dispatch(closePopup()),
        handleShowAlert: type => dispatch(showAlert(type)),

        handleSetWidgetChallenge: challenge => dispatch(setWidgetChallenge(challenge)),
        handleUpdateChallenge: (id, body) => dispatch(updateChallenge(id, body))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeGame)
