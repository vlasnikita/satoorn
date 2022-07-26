import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from 'react-router-dom';

import {Challenge} from 'Components/Challenge';
import {showAlert} from "Actions/alert";
import {getChallengeById, unsetRedirectToChallenge, updateChallenge} from "Actions/challenges";
import {setCreateChallengeDraft} from "Actions/createChallenge";
import {closePopup, openPopup} from 'Actions/popup';
import {removeActiveTransaction} from "Actions/transactions";
import CHALLENGE_STATE from "Constants/challenge_states";
import {linkifyPlainText} from "Utils";
import {getTierNumber} from "Utils/challenge_tiers";

import venzel from 'Static/challenge/venzel-page.svg';
import heartIcon from 'Static/challenge/heart.svg'


export class ChallengePage extends Challenge {

    eventContext = 'CHALLENGE_PAGE';

    constructor(props) {
        super(props);

        this.props.handleGetActiveChallenge(this.props.match.params.challengeId);
        if (this.props.activeTransaction && this.props.activeTransaction.id !== null)
            this.props.handleRemoveActiveTransaction();

        this.state = {
            isCopyChallengeRedirect: false,
            isError: false,
            isCanceled: false,
            newBidAmount: props.configs.minPaymentAmount.value,
            minBid: props.configs.minPaymentAmount.value,
            isInputFocused: false
        }
    }

    componentDidMount() {
        document.title = this.props.activeChallenge.title || 'SATOORN'
        this.updateRejectHash();
        this.updateDonateHash();
        this.removeUpdatedFlagOnComletedUpdate();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        document.title = this.props.activeChallenge.title || 'SATOORN'
    }

    challengeProps = () => this.props.activeChallenge;

    getChallengeBody = () => {
        const {title, description, donationAmount} = this.challengeProps();
        // noinspection HtmlRequiredAltAttribute
        return (
            <div className="ChallengePage__body">
                <img className='ChallengePage__venzel' src={venzel}/>
                <div
                    className={`Challenge__price ChallengePage__price`}>
                    <p className={`Challenge__priceText Challenge__priceText_t${getTierNumber(donationAmount)} ChallengePage__priceText`}>{('' + donationAmount).split(/\D/).join('')}<span
                        className="Challenge__priceText_currency ChallengePage__priceText_currency">₽</span></p>
                </div>
                <div className="ChallengePage__info">
                    <p className="ChallengePage__title">{title}</p>
                    <div
                        className="ChallengePage__description"
                        dangerouslySetInnerHTML={{__html: linkifyPlainText(description)}}
                    />
                    {this.getActions()}
                    <div className="ChallengePage__meta">
                        {this.renderDonatorsList()}
                    </div>
                    {/**/}
                </div>
            </div>
        )
    };

    getActions = () => {
        if (this.isMyChallenge()) {
            if (this.challengeStateIs(CHALLENGE_STATE.ACCEPTED)) {
                return (
                    <Fragment>
                        {this.getShareButtons()}
                    </Fragment>
                )
            }
            else return this.getStreamerActions()
        }
        else {
            if (this.challengeProps().state === CHALLENGE_STATE.ACCEPTED) return (
                <div className='Challenge__actions'>
                    <p className="Challenge__input ChallengePage__input ChallengePage__input_accepted">Челлендж
                        принят</p>
                </div>
            );
            else if (this.challengeProps().state === CHALLENGE_STATE.REJECTED) return (
                <div className='Challenge__actions'>
                    <p className="Challenge__input ChallengePage__input ChallengePage__input_rejected">Челлендж
                        отклонён</p>
                </div>
            );
            else {
                return (
                    <div
                        className={`Challenge__actions ${this.state.isError && 'Challenge__actions_error'} ChallengePage__actions`}>
                        <div className="Challenge__inputContainer">
                            <input
                                value={this.state.newBidAmount}
                                className="Challenge__input ChallengePage__input"
                                onChange={this.handleDonationChange}
                                onFocus={() => this.setState({isInputFocused: true})}
                                onBlur={() => this.setState({isInputFocused: false})}
                            />
                            <span className="Challenge__inputCurrency">₽</span>
                        </div>
                        <button
                            id="donateButton"
                            className="Button Button_purple Challenge__button"
                            onClick={this.handleDonateSubmit}
                        >Повысить
                        </button>
                        {this.state.isError &&
                        <p className="Challenge__actions_errorMessage">Минимальная ставка {this.state.minBid}₽</p>}
                    </div>
                )
            }
        }
    };
    handleCopyChallenge = () => {
        this.props.handleSetCreateChallengeDraft(this.challengeProps());
        this.setState({isCopyChallengeRedirect: true})
    };

    getAllDonatorsFlattened() {
        return Object.entries(this.challengeProps().donators);
    }

    renderDonatorsList() {
        return (
            <Fragment>
                <div className="Challenge__metaColumn Challenge__metaColumn_paddingTop">
                    <div className="Challenge__metaRow">
                        <span className="Challenge__metaLabel">Донатеры</span>
                        <div className="Challenge__metaDonaters">
                            <img src={heartIcon} className="Challenge__metaIcon"/>
                        </div>
                    </div>
                </div>
                <div className='ChallengePage__donators'>
                    {this.getAllDonatorsFlattened().map((donatorData, i) => {

                        const name = donatorData[0];
                        const {avatarLink, login, amount } = donatorData[1];
                        // noinspection HtmlRequiredAltAttribute
                        return(
                            <div key={i} className='ChallengePage__donatorsItem'>
                                <p className='ChallengePage__donatorsAmount'>{amount}₽&nbsp;—&nbsp;</p>
                                <Link
                                    to={`/${login}`}
                                    className='ChallengePage__donatorsName'>
                                    {name}
                                </Link>
                                <img src={avatarLink}
                                     className='ChallengePage__donatorsAvatar'>
                                </img>
                                {name === this.challengeProps().authorLogin && <p className='ChallengePage__donatorsAmount'>&nbsp;(автор)</p>}
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        )
    }

    render() {
        if (this.state.isCopyChallengeRedirect) return <Redirect
            to={`/${this.challengeProps().streamerLogin}/create`}/>;

        // noinspection EqualityComparisonWithCoercionJS
        if (!!this.props.redirectToChallenge && this.props.redirectToChallenge.challengeId != this.challengeProps().id)
            return <Redirect to={`/${this.props.redirectToChallenge.login}/challenges/${this.props.redirectToChallenge.challengeId}`}/>;
        else this.props.handleUnsetRedirectToChallenge();

        return (
            <div className="ChallengePage">
                {this.props.isActiveChallengeLoaded && this.getChallengeBody()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    configs: state.configs,

    activeChallenge: state.activeChallenge.activeChallenge,
    isActiveChallengeLoading: state.activeChallenge.loading,
    isActiveChallengeLoaded: state.activeChallenge.loaded,

    activeTransaction: state.activeTransaction,
    redirectToChallenge: state.challenges.redirectToChallenge
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetActiveChallenge: id => dispatch(getChallengeById(id)),
        handleSetCreateChallengeDraft: challengeDraft => dispatch(setCreateChallengeDraft(challengeDraft)),
        handleUpdateChallenge: (id, body) => dispatch(updateChallenge(id, body)),
        handleRemoveActiveTransaction: () => dispatch(removeActiveTransaction()),
        handleUnsetRedirectToChallenge: () => dispatch(unsetRedirectToChallenge()),

        handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge)),
        handleClosePopup: () => dispatch(closePopup()),
        handleShowAlert: type => dispatch(showAlert(type))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengePage))
