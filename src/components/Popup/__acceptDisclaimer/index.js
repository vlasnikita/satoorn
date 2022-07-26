import React, {Component} from 'react';

import {toggleAcceptChallengeOnboardinig} from 'Fetchers/index'

import POPUP_TYPE from 'Constants/popup_type'
import {getSettings} from "Actions/configs";
import {connect} from "react-redux";

class AcceptDisclaimer extends Component {

    state = {
        isChecked: true
    }

    handleSubmit = () => {
        this.props.handleGetSettings()
        this.state.isChecked && toggleAcceptChallengeOnboardinig()
        this.props.handleOpen(POPUP_TYPE.ACCEPT_CHALLENGE, this.props.acceptingChallenge)
    }

    render() {
        return (
            <div className="PopupDisclaimer">
                <p className="PopupDisclaimer__text">
                    Нажимая кнопку "Согласен" вы подтверждаете свою готовность выполнить челлендж своих зрителей.<br/><br/>
                    Деньги переведутся вам сразу в виде доната. Для этого в новом окне нужно будет ввести свои реквизиты. <br/><br/>
                    Дорожите своей аудиторией – добросовестно выполняйте челленджи, и тогда она будет расти. <br/><br/>
                    У нас есть армия модераторов, которые разбирают жалобы зрителей на невыполненные челленджи.<br/>
                    Таким образом мы осуществляем круглосуточную поддержку наших пользователей и наказываем недобросовестных стримеров 🕵️
                </p>
                <div
                    className="CreateOrder__row CreateOrder__row_checkbox PopupDisclaimer__row"
                    onClick={() => this.setState({ isChecked: !this.state.isChecked })}
                >
                    <label className="CreateOrder__input">
                        <input
                            type="checkbox"
                            checked={this.state.isChecked}
                            onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                        />
                        {this.state.isChecked && <span className="CreateOrder__inputChecked"/>}
                    </label>
                    <span className="CreateOrder__inputHint PopupDisclaimer__inputHint">Больше не показывать</span>
                </div>
                <button
                    className="Button Button_purple Popup__submit"
                    onClick={this.handleSubmit}
                >Яснопонятно</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetSettings: () => dispatch(getSettings()),
    }
}

export default connect(null,mapDispatchToProps)(AcceptDisclaimer)