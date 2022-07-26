import React, {Component} from 'react';
import {connect} from "react-redux";

import {openPopup} from 'Actions/popup';
import {openPaymentWidget} from 'Utils';
import log from 'Utils/logging';
import {generateFKPaymentLink} from 'Payments/freekassa.js'
import {generateYKPaymentLink} from 'Payments/yookassa.js'
import ALERT_TYPE from "Constants/alert_type";
import POPUP_TYPE from 'Constants/popup_type';

import fiatIcon from 'Static/payments/payments-fiat.gif'
import cryptoIcon from 'Static/payments/payments-crypto.gif'
import newWindowIcon from 'Static/new_window.svg'
import { async } from 'regenerator-runtime';

class PaymentMethods extends Component {

    state = {
        paymentURL: null
    }

    componentDidMount(){
        console.log(this.props.payment)
    }

    // submitFiatPayment = () => {

    //     const { newBidAmount, hash, challenge } = this.props.payment
    //     const { id, title, donationAmount } = challenge

    //     donateChallenge(newBidAmount, id, hash)
    //     .then(res => {
    //         if (res.code !== ALERT_TYPE.OK) {
    //             this.props.handleShowAlert(res.code);
    //         }
    //         else {
    //             const desc = `Повышение челленджа ${title}`;
    //             log.debug(desc, res);
    //             openPaymentWidget(newBidAmount, res.transactionId, desc, true, id, {donationAmount: +donationAmount + newBidAmount});
    //         }
    //     })
    //     .catch(() => this.props.handleShowAlert(ALERT_TYPE.INTERNAL_ERROR));
    // }

    processCryptoPayment = () => {
        const { id, donationAmount } = this.props.payment.challenge
        const paymentURL = generateFKPaymentLink(donationAmount, id)
        this.setState({ paymentURL })
        window.open(paymentURL, '_blank').focus();
    }

    processFiatPayment = async () => {
        const { id, donationAmount, title, streamerLogin } = this.props.payment.challenge
        const paymentURL = await generateYKPaymentLink(id, donationAmount, title, streamerLogin)
        this.setState({ paymentURL })
        window.open(paymentURL, '_blank').focus();
    }

    getSuccessMessage = () => (
        <div className="PopupPayment">
            <h1 className="Popup__title">Платёж открылся в новой вкладке</h1>
            <p class="Popup__subtitle">Если этого не произошло, <a href={this.state.paymentURL} target="_blank">нажмите здесь</a></p>
            <button
                className="Button Button_purple Popup__submit"
                onClick={console.log}
            >Далее</button>
        </div>
    )

    render() {
        if(this.state.paymentURL) return this.getSuccessMessage()
        else return (
            <div className="PopupPayment">
                <h1 className="Popup__title">Выберите способ пополнения</h1>
                <div className="PopupPayment__row">
                    <button 
                        className="PopupPayment__method"
                        onClick={this.processFiatPayment}    
                    >
                        <img src={newWindowIcon} className="PopupPayment__newWindow"/>
                        <img className='PopupPayment__methodIcon' src={fiatIcon}/>
                        <p>Банковская карта</p>
                    </button>
                    <button 
                        className="PopupPayment__method"
                        onClick={this.processCryptoPayment}
                    >
                        <img src={newWindowIcon} className="PopupPayment__newWindow"/>
                        <img className='PopupPayment__methodIcon' src={cryptoIcon}/>
                        <p>Криптовалюта</p>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    payment: state.payment,
    profile: state.profile
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleShowAlert: type => dispatch(showAlert(type)),
        handleOpenPopup: (type) => dispatch(openPopup(type))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentMethods)