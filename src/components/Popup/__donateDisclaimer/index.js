import React, {Component} from 'react';

import {toggleDonateChallengeOnboardinig} from 'Fetchers/index'
import {connect} from "react-redux";
import {getSettings} from "Actions/configs";

class DonateDisclaimer extends Component {

    state = {
        isChecked: true
    }

    handleSubmit = () => {
        this.props.handleGetSettings()
        this.state.isChecked && toggleDonateChallengeOnboardinig()
        this.props.handleClose()
    }

    render() {
        return (
            <div className="PopupDisclaimer">
                <p className="PopupDisclaimer__text">
                    Нажимая кнопку "Повысить" или "Создать челлендж" вы переводите указанную сумму на промежуточный счёт сервиса.<br/><br/>
                    Если стример согласится выполнить челлендж, деньги атоматически переведутся ему как при обычном донате.<br/><br/>
                    Если стример откажется – сумма вернётся вам обратно за вычетом комиссии платёжного сервиса.<br/><br/>
                    Мы против комиссии, но пока что использование стороннего сервиса – единственная опция для нас. По мере роста сервиса мы разработаем собственный платёжный модуль, чтобы отказаться от комиссии для зрителей.<br/>
                    Желаем классных стримов и хорошего настроения! 😉
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

export default connect(null,mapDispatchToProps)(DonateDisclaimer)