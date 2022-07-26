import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";

import { acceptChallenge, applyCommission } from 'Fetchers/index'
import { updateChallenge } from "Actions/challenges";
import { showAlert } from "Actions/alert";
import { getOperationHash } from "Utils/index";

import PAYMENT_METHODS from 'Constants/payment_methods'
import CHALLENGE_STATES from 'Constants/challenge_states'
import ALERT_TYPE from 'Constants/alert_type'
import log from '../../../utils/logging';

let hashAccept = null

export class AcceptChallenge extends Component {

    state = {
        selected: Object.keys(PAYMENT_METHODS)[0],
        requisite: '',
        isErrors: [],
        amountWithCommission: 100,
        minimalCommission: null,
        code: 'OK'
    }

    componentDidMount() {
        hashAccept = getOperationHash(`ChallengeAccept${+new Date()}${this.props.acceptingChallenge.id || ''}`)
        this.calculateCommissionSettingState(this.state.selected);
    }

    resolveFormContent = () => {
        if(this.state.code == 'COMMISSION_OVERFLOW') {
            return (
                <div>
                    <p className="PopupChallengeAccept__text">
                            К сожалению, комиссия при данном способе выплате превышает доступную для выплаты сумму :(   
                    </p>
                    <p className="PopupChallengeAccept__text">Поробуйте другой способ выплаты или соберите больше донатов на этот челлендж.</p>    
                </div>    
             )
        } else {
            return this.getForm()   
        }        
    }

    getForm = () => {
        if(this.state.selected === 'CARD') return (
            <Fragment>
                <p className="PopupChallengeAccept__text">Номер карты</p>
                <input
                    id="cardNumber"
                    autoComplete="cc-number"
                    name="cardNumber"
                    className={`PopupChallengeAccept__input ${this.state.isErrors.includes('requisite') && 'PopupChallengeAccept__input_error'}`}
                    type="text"
                    value={this.state.requisite}
                    onChange={this.handleCardNumberChange}
                />
                {this.state.isErrors.includes('requisite') &&
                <p className="PopupChallengeAccept__input_errorMessage">Некорректный номер карты</p>}
            </Fragment>
        )
        else if(this.state.selected === 'QIWI') return (
            <Fragment>
                <p className="PopupChallengeAccept__text">Номер телефона в формате 7XXXXXXXXXX</p>
                <input
                    id="qiwiPhoneNumber"
                    className={`PopupChallengeAccept__input ${this.state.isErrors.includes('requisite') && 'PopupChallengeAccept__input_error'}`}
                    type="text"
                    value={this.state.requisite}
                    onChange={this.handleQiwiWalletChange}
                />
                {this.state.isErrors.includes('requisite') &&
                <p className="PopupChallengeAccept__input_errorMessage">Некорректный номер телефона</p>}
            </Fragment>
        )
    }

    getAmountText = () => {
        return (
            <div className="PopupChallengeAccept__row">
                <p className="PopupChallengeAccept__text">Сумма челленджа с учётом комиссии</p>
                <p className="PopupChallengeAccept__amount">{this.state.amountWithCommission}₽</p>
            </div>
        )
    }

    getMinimalCommissionText = () => {
        return (
            <div className="PopupChallengeAccept__row">
                <p className="PopupChallengeAccept__text">
                    Минимальная комиссия при этом способе выплаты: {this.state.minimalCommission}₽
                </p>
            </div>
        )
    }

    handleCardNumberChange = e => {
        const val = e.target.value.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').slice(0,22);
        this.setState({ requisite: val, isErrors: this.state.isErrors.filter(el => el !== 'requisite') })
    }

    handleQiwiWalletChange = e => {
        const val = e.target.value.replace(/[^+0-9]/g, "")
        this.setState({ requisite: val, isErrors: this.state.isErrors.filter(el => el !== 'requisite') })
    }

    handleSubmit = () => {
        const { requisite, selected } = this.state
        const filteredRequisite = requisite.split(' ').join('').replace('+', '')
        let isErrors = []

        const creditCardPattern = /^((\d{16})|(\d{18}))$/
        const qiwiWalletPattern = /^(7\d{10})$/

        if(!requisite) isErrors.push('requisite')
        else if(selected === 'CARD' && !(creditCardPattern.test(filteredRequisite))) isErrors.push('requisite')
        else if(selected === 'QIWI' && !(qiwiWalletPattern.test(filteredRequisite))) isErrors.push('requisite')

        if (isErrors.length !== 0) {
            log.error('', isErrors)
            this.setState({isErrors})
        }
        else {
            let amount = this.props.acceptingChallenge.amount
            acceptChallenge(this.props.acceptingChallenge.id, selected, filteredRequisite, amount, hashAccept)
                .then(res => {
                    if(res.code !== ALERT_TYPE.OK){ this.props.handleShowAlert(res.code) }
                    else {
                        hashAccept = getOperationHash(`ChallengeAccept${+new Date()}${this.props.acceptingChallenge.id || ''}`)
                        this.props.handleUpdateChallenge(this.props.acceptingChallenge.id, {
                            state: CHALLENGE_STATES.ACCEPTED,
                            isJustUpdated: true
                        })
                    }
                })
                .catch(error => this.props.handleShowAlert(ALERT_TYPE.INTERNAL_ERROR))

            this.props.handleClose()
        }
    }

    calculateCommissionSettingState(method) {
        applyCommission(this.props.acceptingChallenge.id, method)
            .then(res => this.setState(
                {
                 amountWithCommission: res.amountWithCommission, 
                 minimalCommission: res.minimalCommission,
                 code: res.code
                }
            ))
            .catch(e => log.error('Commission calculation error', e))
    }

    render() {
        return (
            <div className="PopupChallengeAccept">
                {!!this.state.amountWithCommission && this.getAmountText()}

                <div className="PopupChallengeAccept__row">
                    <p className="PopupChallengeAccept__text">Выберите способ выплаты</p>
                    <div className="PopupChallengeAccept__types">
                        {Object.keys(PAYMENT_METHODS).map((key, i) => (
                            <p
                                className={`PopupChallengeAccept__type ${key === this.state.selected && 'PopupChallengeAccept__type_active'}`}
                                key={i}
                                onClick={() => {
                                    this.setState({selected: key, requisite: '' });
                                    this.calculateCommissionSettingState(key)
                                }
                                }
                            >{PAYMENT_METHODS[key]}</p>
                        ))}
                    </div>
                    {!!this.state.minimalCommission && this.getMinimalCommissionText()}
                </div>
                <div className="PopupChallengeAccept__row">{this.resolveFormContent()}</div>

                <button
                    disabled={this.state.code != 'OK'}
                    className="Button Button_purple Popup__submit"
                    onClick={this.handleSubmit}
                >Принять челлендж</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        handleShowAlert: type => dispatch(showAlert(type)),
        handleUpdateChallenge: (id, body) => dispatch(updateChallenge(id, body))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptChallenge)
