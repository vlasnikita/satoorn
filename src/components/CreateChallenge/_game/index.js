import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import CreateChallenge from "Components/CreateChallenge";
import {setActiveStreamer} from "Actions/streamers";
import {setCreateChallengeDescription, setCreateChallengeDraft, setCreateChallengeTitle} from "Actions/createChallenge";
import {setRedirectToChallenge} from "Actions/challenges";
import {addActiveTransaction} from "Actions/transactions";
import {openPopup} from "Actions/popup";
import {showAlert} from "Actions/alert";

export class CreateChallengeGame extends CreateChallenge {

    constructor(props) {
        super(props);

        this.state = {
            isErrors: [],
            newBidAmount: props.configs.minPaymentAmount.value,
            minBid: props.configs.minPaymentAmount.value,
            isInputFocused: false
        }
    }

    render() {
        return (
            <div className="Island CreateChallenge_game">
                <div className="CreateChallenge__row">
                    <span className="CreateChallenge__label">Название</span>
                    <input
                        autoComplete="off"
                        name='title'
                        id='title'
                        type='text'
                        className={`CreateChallenge__input ${this.state.isErrors.includes('title') && 'CreateChallenge__input_error'}`}
                        value={this.state.title}
                        onChange={e => {
                            this.handleSetCreateChallengeTitle(e.target.value)
                            this.resetInputErrors(e)
                        }}
                    />
                    {this.state.isErrors.includes('title') &&
                    <p className="CreateChallenge__input_errorMessage">Не указана игра</p>}
                </div>
                <div className="CreateChallenge__row">
                    {this.getActions()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    configs: state.configs,

    templateDescription: state.createChallenge.description,
    challengeDraft: state.createChallenge.challengeDraft,

    activeStreamer: state.activeStreamer.activeStreamer,
    isActiveStreamerLoading: state.activeStreamer.loading,
    isActiveStreamerLoaded: state.activeStreamer.loaded,

    activeTransaction: state.transactions.activeTransaction,
    redirectToChallenge: state.challenges.redirectToChallenge
});

const mapDispatchToProps = (dispatch) => ({
    handleSetActiveStreamer: name => dispatch(setActiveStreamer(name)),

    updateSavedChallengeTitle: title => dispatch(setCreateChallengeTitle(title)),
    updateSavedChallengeDescription: description => dispatch(setCreateChallengeDescription(description)),
    handleResetCreateChallengeDraft: () => dispatch(setCreateChallengeDraft(null)),

    handleSetRedirectToChallenge: challengeId => dispatch(setRedirectToChallenge(challengeId)),
    handleAddActiveTransaction: transaction => dispatch(addActiveTransaction(transaction)),

    handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge)),
    handleShowAlert: type => dispatch(showAlert(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengeGame)
