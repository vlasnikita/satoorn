import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from "react-router-dom";

import Templates from "Components/Templates";

import {setCreateChallengeDescription, setCreateChallengeDraft, setCreateChallengeTitle} from "Actions/createChallenge";
import {setRedirectToChallenge} from 'Actions/challenges'
import {addActiveTransaction} from "Actions/transactions";
import {openPopup} from 'Actions/popup'
import {showAlert} from 'Actions/alert'
import {setActiveStreamer} from "Actions/streamers";
import {createChallenge} from 'Fetchers'
import {numbersMask} from "Utils/input_masks";
import {getOperationHash, openPaymentWidget} from 'Utils'

import POPUP_TYPE from "Constants/popup_type";
import ALERT_TYPE from 'Constants/alert_type';
import {logUserAction} from 'Utils/metrics';

let hashCreate = null

class CreateChallenge extends Component {

    eventContext = 'CREATE_CHALLENGE_PAGE'

    constructor(props) {
        super(props);
        this.state = {
            isErrors: [],
            newBidAmount: props.configs.minPaymentAmount.value,
            minBid: props.configs.minPaymentAmount.value,
            isInputFocused: false,
            isGameFocused: false
        }
    }

    componentDidMount() {
        if(this.props.documentTitle) document.title = this.props.documentTitle

        this.resetCreationHash()

        if (!this.props.activeStreamer.id) this.props.handleSetActiveStreamer(this.props.match.params.username)

        const challengeDraft = this.getChallengeDraft()
        if (!!challengeDraft) {
            let {title, description, amount} = JSON.parse(challengeDraft)
            title = title || ''
            description = description || ''
            amount = amount || this.state.minBid

            this.setState({newBidAmount: amount})
            this.handleSetCreateChallengeTitle(title)
            this.handleSetCreateChallengeDescription(description)
            this.cleanupChallengeDraft();
        }
        // ресетим поля либо сетим значения, если это копирование другого челленджа
        else if (!this.props.challengeDraft) {
            // Если brand new челлендж
            this.handleSetCreateChallengeTitle('')
            this.handleSetCreateChallengeDescription('')
        } else {
            // Если копирование другого челленджа
            this.handleSetCreateChallengeTitle('')
            this.handleSetCreateChallengeDescription(this.props.challengeDraft.description)
            this.handleResetCreateChallengeDraft()
        }
    }

    cleanupChallengeDraft() {
        localStorage.removeItem('challengeDraft');
    }

    getChallengeDraft() {
        return localStorage.getItem('challengeDraft');
    }

    componentDidUpdate() {
        if (this.configUpdated()) {
            this.setState({
                newBidAmount: this.props.configs.minPaymentAmount.value,
                minBid: this.props.configs.minPaymentAmount.value,
            })
        }
        this.checkTemplateDataUpdatingInputs();
    }

    handleDonationChange = e => {
        const newBidAmount = numbersMask(e.target.value)
        this.setState({
            newBidAmount,
            isErrors: this.state.isErrors.filter(el => el !== 'newBidAmount')
        })
    }

    handleChallengeSubmit = () => {
        logUserAction(this.eventContext, 'CREATE_CHALLENGE', this.props.profile.id)

        const validData = this.props.isGame ? this.checkIfGameInputDataIsValid() : this.checkIfInputDataIsValid()
        if(validData){

            if (!this.props.profile.id) {
                console.log(333333333333)

                this.saveChallengeDraft();
                this.props.handleOpenPopup(POPUP_TYPE.UNREGISTRED)
            } else if (!this.props.configs.settings.value.challengeDonateDetailsConfirmed) {
                this.props.handleOpenPopup(POPUP_TYPE.DONATE_DISCLAIMER)
            } else {
                console.log(44444444444)

                this.createChallengeOpeningPaymentWidget();
            }
        }
    }

    getActions = () => {
        return (
            <div className={`Challenge__actions ${this.state.isErrors.includes('newBidAmount') && 'Challenge__input_error'}`}>
                <div className="Challenge__inputContainer">
                    <input
                        type="text"
                        name='newBidAmount'
                        id='newBidAmount'
                        className='Challenge__input Challenge__input_payment'
                        value={this.state.newBidAmount}
                        onChange={this.handleDonationChange}
                        onFocus={() => this.setState({isInputFocused: true})}
                        onBlur={() => this.setState({isInputFocused: false})}
                    />
                    {!this.state.isInputFocused &&
                    <span
                        className=
                            {`Challenge__inputCurrency Challenge__inputCurrency_${
                                this.state.newBidAmount.toString().length}`
                            }>₽
                    </span>}
                    {this.state.isErrors.includes('newBidAmount') &&
                    <p className="Challenge__input_errorMessage">Минимальная
                        ставка {this.state.minBid}₽</p>}
                </div>
                <div
                    className="Button Button_purple Challenge__button"
                    id="CreateChallenge__button"
                    onClick={this.handleChallengeSubmit}
                >Создать
                </div>
            </div>
        )
    }

    saveChallengeDraft() {
        localStorage.setItem('challengeDraft', JSON.stringify(this.createChallengeDraft()));
    }

    createChallengeOpeningPaymentWidget() {
        createChallenge(this.createChallengeDraft())
            .then(res => {

                if (res.code !== ALERT_TYPE.OK) {
                    this.props.handleShowAlert(res.code);
                } else {
                    this.resetCreationHash();
                    this.props.handleAddActiveTransaction({id: res.transactionId, inProgress: true, success: false});

                    console.log(111000)

                    openPaymentWidget(
                        this.state.newBidAmount,
                        res.transactionId,
                        `Создание челленджа ${this.state.title}`,
                        false,
                        res.challengeId,
                        {donationAmount: this.state.newBidAmount},
                        this.props.activeStreamer.login
                    );
                }
            })
            .catch(() => this.props.handleShowAlert(ALERT_TYPE.INTERNAL_ERROR));
    }

    checkTemplateDataUpdatingInputs() {
        if (!!this.props.templateDescription && this.state.description !== this.props.templateDescription)
            this.handleSetCreateChallengeDescription(this.props.templateDescription);
    }

    configUpdated() {
        return !this.state.minBid && this.props.configs.minPaymentAmount.loaded
            &&
            !!this.props.configs.minPaymentAmount.value;
    }

    resetCreationHash() {
        hashCreate = getOperationHash(`ChallengeCreate${+new Date()}`);
    }

    createChallengeDraft() {
        const {newBidAmount, title, description} = this.state
        const imageId = Math.ceil(Math.random() * 200)

        return {
            imageId,
            title,
            description,
            streamerId: this.props.activeStreamer.id,
            amount: +newBidAmount,
            operationKey: hashCreate
        }
    }

    checkIfInputDataIsValid() {
        const {newBidAmount, minBid, title, description} = this.state
        let isErrors = [];
        if (!title)
            isErrors.push('title');
        if (!description)
            isErrors.push('description');
        if (!newBidAmount || newBidAmount < minBid)
            isErrors.push('newBidAmount');

        if (isErrors.length !== 0) {
            this.setState({isErrors});
            return false
        } else return true
    }

    checkIfGameInputDataIsValid = () => {
        if(!this.props.gameName) this.setState({ isErrors: ['gameName'] })
        else return true
    }

    resetInputErrors = (e) => {
        this.setState({
            isErrors: this.state.isErrors.filter(el => el !== e.target.name)
        })
    }

    handleCancelCreating = () => {
        this.props.history.push(`/${this.props.activeStreamer.login}/challenges`)
    }
    handleSetCreateChallengeTitle = (title) => {
        this.setState({title: title})
        this.props.updateSavedChallengeTitle(title)
    }

    handleSetCreateChallengeDescription = (description) => {
        this.setState({description: description})
        this.props.updateSavedChallengeDescription(description)
    }

    renderCreateGameChallenge = () => {
        return (
            <div className="Island CreateChallenge_game">
                <div className="CreateChallenge__row">
                    <span className="CreateChallenge__label">Название игры</span>
                    <input
                        autoComplete="off"
                        name='gameName'
                        id='gameName'
                        type='text'
                        className={`CreateChallenge__input ${this.state.isErrors.includes('gameName') && 'CreateChallenge__input_error'}`}
                        value={this.props.gameName}
                        onChange={e => {
                            this.handleSetCreateChallengeTitle(e.target.value)
                            this.resetInputErrors(e)
                            this.props.updateGameName(e.target.value)
                        }}
                        onFocus={() => {
                            this.setState({
                                isErrors: this.state.isErrors.filter(el => el !== 'gameName')
                            })
                            this.props.onFocus()
                        }}
                    />
                    {this.props.children}
                    {this.state.isErrors.includes('gameName') &&
                    <p className="CreateChallenge__input_errorMessage">Не указана игра</p>}
                </div>
                <div className="CreateChallenge__row">
                    {this.getActions()}
                </div>
            </div>
        )
    }

    renderForm = () => {
        return (
            <Fragment>
                <div className="CreateChallenge__row">
                    <span className="CreateChallenge__label">Название</span>
                    <input
                        autoComplete="off"
                        name='title'
                        id='title'
                        type='text'
                        className={`CreateChallenge__input ${this.state.isErrors.includes('title') && 'CreateChallenge__input_error'}`}
                        value={this.props.gameName}
                        onChange={e => {
                            this.handleSetCreateChallengeTitle(e.target.value)
                            this.resetInputErrors(e)
                        }}
                    />
                    {this.state.isErrors.includes('title') &&
                    <p className="CreateChallenge__input_errorMessage">Надо как-то назвать челлендж!</p>}
                </div>
                <div className="CreateChallenge__row CreateChallenge__row_description">
                    <span className="CreateChallenge__label">Описание челленджа</span>
                    <textarea
                        rows='5'
                        name='description'
                        id='description'
                        className={`CreateChallenge__input ${this.state.isErrors.includes('description') && 'CreateChallenge__input_error'}`}
                        value={this.state.description}
                        onChange={e => {
                            this.handleSetCreateChallengeDescription(e.target.value)
                            this.resetInputErrors(e)
                        }}
                    />
                    {this.state.isErrors.includes('description') &&
                    <p className="CreateChallenge__input_errorMessage">А как же описание??</p>}
                </div>
                <div className="CreateChallenge__row CreateChallenge__row_payment">
                    <span className="CreateChallenge__label">Сумма</span>
                    {this.getActions()}
                </div>
            </Fragment>
        )
    }

    render() {
        if (!!this.props.redirectToChallenge) return (
            <Redirect to={`/${this.props.redirectToChallenge.login}/challenges/${this.props.redirectToChallenge.challengeId}`}/>
        )
        if (this.props.isGame) return this.renderCreateGameChallenge()

        return (
            <div className="Container CreateChallenge">
                <div className="Container__body Island CreateChallenge__body">
                    {this.renderForm()}
                    <button
                        className="Button Button_greytext CreateChallenge__button"
                        onClick={this.handleCancelCreating}
                    >Отменить
                    </button>
                </div>
                <Templates/>
            </div>
        )
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

    handleSetRedirectToChallenge: (challengeId, login) => dispatch(setRedirectToChallenge(challengeId, login)),
    handleAddActiveTransaction: transaction => dispatch(addActiveTransaction(transaction)),

    handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge)),
    handleShowAlert: type => dispatch(showAlert(type))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateChallenge))
export const CreateChallengePure = CreateChallenge