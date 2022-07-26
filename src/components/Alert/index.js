import React, { Component } from 'react';
import { connect } from 'react-redux'
import { hideAlert } from "Actions/alert";

import ALERT_TYPE from 'Constants/alert_type'
import { getAlertSuccessEmoji } from 'Utils/index'

let isUserAFK = true

class Alert extends Component {

    componentDidMount(){
        isUserAFK = true;

        ['click','mouseover'].forEach((ev) => {
            document.addEventListener(ev, () => {
                if(isUserAFK){
                    isUserAFK = false
                    setTimeout(this.fadeAlert, 1250)
                    setTimeout(this.props.handleHideAlert, 1750)
                }
            })
        })
    }

    fadeAlert = () => document.querySelector('.Alert').style.opacity = 0

    render() {
        switch (this.props.alert.type) {
            case(ALERT_TYPE.OK):
            return (
                <div className='Alert Alert_green'>
                    <p className="Alert__text">Успешная операция {getAlertSuccessEmoji()}</p>
                </div>
            )

            case(ALERT_TYPE.CHALLENGE_AMOUNT_UPDATED):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">У челленджа изменилась сумма. Обновите страницу.</p>
                </div>
            )

            case(ALERT_TYPE.ALREADY_EXECUTED):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">Челлендж уже принят. Обновите страницу.</p>
                </div>
            )

            case(ALERT_TYPE.CHALLENGE_STATE_UPDATED):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">У челленджа изменился статус. Обновите страницу.</p>
                </div>
            )

            case(ALERT_TYPE.INTERNAL_ERROR):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">Ошибка сервера. Повторите попытку, обновив страницу.</p>
                </div>
            )

            case(ALERT_TYPE.PS_ERROR):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">Ошибка платёжной системы. Проверьте свои данные и повторите попытку.</p>
                </div>
            )

            case(ALERT_TYPE.PS_UNAVAILABLE):
            return (
                <div className='Alert Alert_red'>
                    <p className="Alert__text">Платёжная система в данный момент недоступна. Повторите попытку позднее.</p>
                </div>
            )

            default: return '';
        }
    }
}

const mapStateToProps = (state) => ({
    alert: state.alert
});


const mapDispatchToProps = dispatch => {
    return {
        handleHideAlert: () => dispatch(hideAlert())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
