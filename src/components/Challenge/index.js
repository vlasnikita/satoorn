import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link,Redirect} from "react-router-dom";

import {showAlert} from "Actions/alert";
import {updateChallenge} from 'Actions/challenges';
import {setWidgetChallenge} from 'Actions/widgetChallenge';
import {closePopup, openPopup} from 'Actions/popup';
import {setActivePayment} from 'Actions/payment';
import ALERT_TYPE from "Constants/alert_type";
import CHALLENGE_STATE from 'Constants/challenge_states';
import POPUP_TYPE from 'Constants/popup_type';
import {donateChallenge, rejectChallenge} from 'Fetchers';
import {getOperationHash, openPaymentWidget} from 'Utils';
import {numbersMask} from 'Utils/input_masks';
import {logDonateEvent, logShareEvent, logUserAction} from 'Utils/metrics';
import {getTierNumber,getVenzel} from 'Utils/challenge_tiers';
import {FB_TEMPLATE, TG_TEMPLATE, TWITTER_TEMPLATE, VK_TEMPLATE} from 'Constants/share_links';
import ShareButton from './shareButtons';
import log from 'Utils/logging';

import heartIcon from 'Static/challenge/heart.svg'
import obsIcon from 'Static/challenge/obs.png'

import bgWhite from 'Static/challenge/bg-white.png'
import bgGreen from 'Static/challenge/bg-green.png'
import bgBlue from 'Static/challenge/bg-blue.png'
import bgPurple from 'Static/challenge/bg-purple.png'
import bgYellow from 'Static/challenge/bg-yellow.png'

export class Challenge extends Component {

    eventContext = 'CHALLENGE_FEED';
    challengeProps = () => this.props.challenge;
    hashReject = null;
    hashDonate = null;

    constructor(props) {
        super(props);
        this.descriptionNode = React.createRef();
        this.state = {
            newBidAmount: props.configs.minPaymentAmount.value,
            minBid: props.configs.minPaymentAmount.value,
            messageDraft: '',
            isError: false,
            isAgreed: false,
            isBalloonError: false,
            isCanceled: false,
            isInputFocused: false,
            isRedirectToWidgets: false,
            isPaymentMethodsPopupVisible: false
        }
    }

    componentDidMount() {
        this.updateRejectHash();
        this.updateDonateHash();

        const descNode = this.descriptionNode.current;
        if (descNode && descNode.scrollHeight < descNode.offsetHeight + 6) {
            descNode.classList.add('Challenge__description_noellipsis')
        }
        this.removeUpdatedFlagOnComletedUpdate();
    }

    componentDidUpdate() {
        this.removeUpdatedFlagOnComletedUpdate();
        if (this.minAmountConfigDefined()) this.setState({
            newBidAmount: this.props.configs.minPaymentAmount.value,
            minBid: this.props.configs.minPaymentAmount.value,
        })
    }

    removeUpdatedFlag = () => {
        setTimeout(
            () => this.props.handleUpdateChallenge(this.challengeProps().id, {isJustUpdated: false}),
            1250
        )
    };

    expand = e => {
        e.target.style.display = 'none';
        this.descriptionNode.current.style.maxHeight = '9999px'
    };

    getPrice = () => {
        const tier = getTierNumber(this.props.challenge.donationAmount)
        return (
            <div className={`Challenge__cover Challenge__cover_t${tier}`}>
                <span className="Challenge__coverShadow"/>
                {this.getCoverBg(tier)}
                <div className="Challenge__price">
                    {getVenzel(this.props.challenge.donationAmount)}
                    <p className="Challenge__priceText">
                        {('' + this.challengeProps().donationAmount).split(/\D/).join('')}
                        <span className="Challenge__priceText_currency">₽</span>
                    </p>
                </div>
            </div>
        )
    };

    getCoverBg = tier => {
        if(tier == 5) return <img src={bgWhite} />
        else if(tier == 4) return <img src={bgGreen} />
        else if(tier == 3) return <img src={bgBlue} />
        else if(tier == 2) return <img src={bgPurple} />
        else if(tier == 1) return <img src={bgYellow} />

    }

    getActions = () => {
        if (this.isMyChallenge()) {
            if (this.challengeStateIs(CHALLENGE_STATE.ACCEPTED)) {
                return this.getShareButtons()
            }
            else {
                return (
                    <Fragment>
                        {this.getStreamerActions()}
                    </Fragment>
                )
            }
        }
        else {
            if (this.challengeStateIs(CHALLENGE_STATE.ACCEPTED)) return null;
            else {
                return this.renderDefaultChallenge();
            }
        }
    };

    handleDonationChange = e => {
        const newBidAmount = numbersMask(e.target.value);
        this.setState({
            newBidAmount,
            isError: false
        })
    };

    initDonation = () => {
        if (!this.props.profile.id) this.props.handleOpenPopup(POPUP_TYPE.UNREGISTRED);
        else if (this.state.newBidAmount < this.state.minBid) this.setState({isError: true});
        else if (!this.props.configs.settings.value.challengeDonateDetailsConfirmed) this.props.handleOpenPopup(POPUP_TYPE.DONATE_DISCLAIMER);
        else {
            logDonateEvent(this.eventContext, this.props.profile.id);
            const {id, title, donationAmount, streamerLogin} = this.challengeProps();
            this.props.handleSetActivePayment({
                challenge: {id, title, donationAmount, streamerLogin},
                newBidAmount: this.state.newBidAmount,
                hash: this.hashDonate
            })
            this.props.handleOpenPopup(POPUP_TYPE.PAYMENT_METHODS);
        }
    };

    handleCancelChallenge = () => {
        logUserAction(this.eventContext, 'REJECT', this.props.profile.id);
        rejectChallenge(this.challengeProps().id, this.hashReject)
            .then(() => {
                this.updateRejectHash();
                this.setState({isCanceled: true})
            })
            .catch(() => this.challengeProps().handleShowAlert(ALERT_TYPE.INTERNAL_ERROR))

    };

    handleAcceptChallenge = () => {
        logUserAction(this.eventContext, 'ACCEPT', this.props.profile.id);
        if (!this.props.configs.settings.value.challengeAcceptDetailsConfirmed) {
            this.props.handleOpenPopup(POPUP_TYPE.ACCEPT_DISCLAIMER, {id: this.challengeProps().id})
        }
        else {
            this.props.handleOpenPopup(POPUP_TYPE.ACCEPT_CHALLENGE, {
                id: this.challengeProps().id,
                amount: this.challengeProps().donationAmount
            })
        }
    };

    handleOpenWidgets = () => {
        this.setState({ isRedirectToWidgets: true })
        logUserAction(this.eventContext, 'OPEN_WIDGETS', this.props.profile.id);
        this.props.handleSetWidgetChallenge(this.props.challenge)
    }

    updateDonateHash() {
        this.hashDonate = getOperationHash(`ChallengeDonate${+new Date()}${this.challengeProps().id}`);
    }

    updateRejectHash() {
        this.hashReject = getOperationHash(`Challenge${+new Date()}${this.challengeProps().id}`);
    }

    renderDefaultChallenge() {
        return (
            <div className={`Challenge__actions ${this.state.isError && 'Challenge__actions_error'}`}>
                <div className="Challenge__inputContainer">
                    <input
                        value={this.state.newBidAmount}
                        placeholder={this.state.minBid}
                        className="Challenge__input"
                        onChange={this.handleDonationChange}
                        onFocus={() => this.setState({isInputFocused: true})}
                        onBlur={() => this.setState({isInputFocused: false})}
                    />
                    <span className="Challenge__inputCurrency">₽</span>
                </div>
                <button
                    id="donateButton"
                    className="Button Button_purple Challenge__button"
                    onClick={this.initDonation}
                >Повысить
                </button>
                {this.state.isError &&
                <p className="Challenge__actions_errorMessage">Минимальная ставка {this.state.minBid}₽</p>}
            </div>
        )
    }

    removeUpdatedFlagOnComletedUpdate() {
        if (this.challengeProps().isJustUpdated) {
            this.removeUpdatedFlag();
        }
    }

    minAmountConfigDefined() {
        return !this.state.minBid && this.props.configs.minPaymentAmount.loaded
            &&
            !!this.props.configs.minPaymentAmount.value;
    }

    challengeStateIs(state) {
        return this.challengeProps().state === state;
    }

    isMyChallenge() {
        return !!this.props.profile.id
            &&
            this.props.profile.login === this.challengeProps().streamerLogin;
    }

    getShareButtons() {
        return (
            <div className="Challenge__actions Challenge__actions_accepted">
                <div className="Challenge__acceptedBlock">
                    <p className="Challenge__acceptedBlockTitle">Вызов принят!</p>
                    <p className="Challenge__acceptedBlockDescription">Расскажи своим подписчикам</p>
                </div>
                <ul className="Challenge__share">
                    <ShareButton
                        onClick={() => this.handleShareButtonClick('TG')}
                        id="shareTg"
                        challengeId={this.challengeProps().id}
                        shareTemplate={TG_TEMPLATE}
                        challengeTitle={this.challengeProps().title}/>
                    <ShareButton
                        onClick={() => this.handleShareButtonClick('VK')}
                        id="shareVk"
                        challengeId={this.challengeProps().id}
                        shareTemplate={VK_TEMPLATE}
                        challengeTitle={this.challengeProps().title}/>
                    <ShareButton
                        onClick={() => this.handleShareButtonClick('TWITTER')}
                        id="shareTwitter"
                        challengeId={this.challengeProps().id}
                        shareTemplate={TWITTER_TEMPLATE}
                        challengeTitle={this.challengeProps().title}/>
                    <ShareButton
                        onClick={() => this.handleShareButtonClick('FB')}
                        id="shareFb"
                        challengeId={this.challengeProps().id}
                        shareTemplate={FB_TEMPLATE}
                        challengeTitle={this.challengeProps().title}/>
                </ul>
            </div>
        );
    }

    getStreamerActions() {
        return (<div className='Challenge__actions Challenge__actions_borderless' style={{display: this.state.isAgreed ? 'none' : 'flex'}}>
            <button
                className="Button Button_greytext Challenge__button_cancel"
                onClick={this.handleCancelChallenge}
            >Отказаться
            </button>
            <button
                className={`Button Button_purple Challenge__button_accept ${this.props.isWidgets ? 'Challenge__button_setwidget' : ''}`}
                onClick={this.handleAcceptChallenge}
            >{this.props.isWidgets ? '+' : 'Принять'}
            </button>
        </div>)
    }

    handleShareButtonClick(event) {
        logShareEvent(this.eventContext, event, this.props.profile.id);
    }

    performFiatDonate() {
        logDonateEvent(this.eventContext, this.props.profile.id);
        const {id, title, donationAmount} = this.challengeProps();
        donateChallenge(this.state.newBidAmount, id, this.hashDonate)
            .then(res => {
                if (res.code !== ALERT_TYPE.OK) {
                    this.props.handleShowAlert(res.code);
                }
                else {
                    this.updateDonateHash();

                    const desc = `Повышение челленджа ${title}`;

                    log.debug(desc, res);

                    openPaymentWidget(this.state.newBidAmount, res.transactionId, desc, true, id, {donationAmount: +amount + this.state.newBidAmount});
                }
            })
            .catch(() => this.props.handleShowAlert(ALERT_TYPE.INTERNAL_ERROR));
    }

    getMeta = () => {
        return (
            <div className="Challenge__meta">
                <div className="Challenge__metaColumn Challenge__metaColumn_mgRight">
                    <div className="Challenge__metaRow">
                        <div className="Challenge__metaDonaters">
                            <div className="Challenge__metaText">{this.challengeProps().donatedPersonCount || 1}</div>
                            <img src={heartIcon} className="Challenge__metaIcon"/>
                        </div>
                    </div>
                </div>
                <div className="Challenge__metaColumn">
                    <span className="Challenge__metaLabel Challenge__metaLabel_solo">Автор</span>
                    <div className="Challenge__metaRow">
                        <Link
                            to={`/${this.challengeProps().authorLogin}`}
                            className="Challenge__metaText"
                        >{this.challengeProps().authorName}</Link>
                    </div>
                </div>
            </div>
        )
    }

    renderCoverGotos(){
        return(
            <Fragment>
                {this.isMyChallenge() && <button
                    className="Challenge__goto"
                    onClick={this.handleOpenWidgets}
                >
                    <img src={obsIcon} className="Challenge__gotoIcon"/>
                    <span className="Challenge__gotoText">Вставить в OBS/Xsplit</span>
                </button>}
            </Fragment>
        )
    }

    renderPaymentMethods(){

        return (
            <div className="Popup">
                <div className="Popup__body">
                    <button onClick={() => this.setState({ isPaymentMethodsPopupVisible: false })} className="Popup__close">&#x2715;</button>
                    BBBBBBBBB
                </div>
            </div>
        )
    }

    render() {
        if(this.state.isRedirectToWidgets) return <Redirect to={`/${this.props.challenge.streamerLogin}/widgets`}/>
        else if (this.state.isCanceled) return null;
        // noinspection HtmlRequiredAltAttribute
        else return (
            <div
                className={
                    `Challenge 
                    ${this.props.isJustUpdated ? 'Challenge_updated' : ''}
                    ${this.props.isWidgets ? 'Challenge_widgetsFeed' : ''}`
                }
                id={`Challenge_${this.challengeProps().id}`}
            >
                <span
                    className="Challenge__widgetSetter"
                    onClick={() => this.props.isWidgets ? this.props.handleSetWidgetChallenge(this.props.challenge) : null}
                />
                <div className="Challenge__header">
                    <div className="Challenge__streamer">
                        <img src={this.props.challenge.streamerPhotoLink}
                             className="Challenge__streamerAvatar"/>
                        <Link
                            to={`/${this.props.challenge.streamerLogin}`}
                            className="Challenge__streamerLogin">
                            {this.props.challenge.streamerName}
                        </Link>
                    </div>
                    {this.getMeta()}
                </div>
                {this.getPrice()}
                <div className="Challenge__body">
                    <Link
                        className="Challenge__title"
                        to={`/${this.challengeProps().streamerLogin}/challenges/${this.challengeProps().id}`}
                    >{this.challengeProps().title}</Link>
                    {this.getActions()}
                </div>
                <div ref={this.descriptionNode} className="Challenge__description">
                    {this.challengeProps().description}
                    <span className="Challenge__descriptionExpand"/>
                </div>
                <Link
                    className="Challenge__description Challenge__description_link"
                    to={`/challenges/${this.challengeProps().id}`}
                >Открыть челлендж</Link>
                {this.renderCoverGotos()}
                {this.state.isPaymentMethodsPopupVisible && this.renderPaymentMethods()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    configs: state.configs
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge)),
        handleClosePopup: () => dispatch(closePopup()),
        handleShowAlert: type => dispatch(showAlert(type)),

        handleSetWidgetChallenge: challenge => dispatch(setWidgetChallenge(challenge)),
        handleUpdateChallenge: (id, body) => dispatch(updateChallenge(id, body)),
        handleSetActivePayment: payload => dispatch(setActivePayment(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);