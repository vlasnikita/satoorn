import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {toggleDonateChallengeOnboardinig} from 'Fetchers/index'
import {cryptoCurrencies} from 'Constants/currency'
import {getSettings} from "Actions/configs";
import {openPaymentWidget, generateQRCode} from 'Utils';
import {floatMask} from 'Utils/input_masks';
import log from 'Utils/logging';
import {generateFKPaymentLink} from 'Utils/freekassa.js'

class PaymentCrypto extends Component {

    state = {
        isCurrencySet: false,
        isCurrencyListVisible: false,
        activeCurrency: null,
        sum: 0.001,
        tx: null,
        QRData: null
    }

    handleSetActiveCurrency = activeCurrency => {
        if(activeCurrency != this.state.activeCurrency){
            generateQRCode(activeCurrency.address)
            .then(res => this.setState({ activeCurrency, QRData: res }))    
        }
    }

    getActiveCurrency = () => {
        const curr = this.state.activeCurrency

        if(curr && curr.symbol){
            return (
                <div
                    value={curr.symbol}
                    className="Input__selectItem Input__selectItem_active"
                >
                    <img src={curr.icon} />
                    <p>{curr.symbol} ({curr.name})</p>
                    <span className='Input__selectExpand'>‹</span>
                </div>
            )
        } else {
            return <div className="Input__selectItem Input__selectItem_active">--Выберите--</div>
        }
    
    }

    getCurrencyList = () => this.state.isCurrencyListVisible && (
        <div className="Input__selectList">
            {Object.values(cryptoCurrencies).map((item, key)=> (
                <button 
                    key={key}
                    value={item.symbol}
                    className="Input__selectItem"
                    onClick={()=>this.handleSetActiveCurrency(item)}
                >
                    <img src={item.icon} />
                    <p>{item.symbol} ({item.name})</p>
                </button>
            ))}
        </div>
    )
        
    getSteps = (activeCurrency, sum, QRData) => activeCurrency && activeCurrency.symbol && (
        <Fragment>
            <div className="PopupPayment__row PopupPayment__row_step">
                <div className="PopupPayment__column">
                    <div className="PopupPayment__step">
                        <span className='PopupPayment__stepNumber'>1</span>
                        <p className='PopupPayment__stepText'>Переведите <span>{sum}</span> ВТС на адрес <span>{activeCurrency.address}</span></p>
                    </div>
                    <div className="PopupPayment__step">
                        <span className='PopupPayment__stepNumber'>2</span>
                        <p className='PopupPayment__stepText'>А затем укажите хэш транзакции:</p>
                        
                    </div>
                </div>
                <img className='PopupPayment__qr' src={QRData}/>
            </div>
            <div className="Input Input_tx">
                <div className="Input__column">
                    <span className="Input__label">Хэш транзакции</span>
                    <input
                        type="text"
                        className='Input__input Input__input_large'
                        onChange={e => this.setState({ tx: e.target.value })} 
                    />
                </div>
            </div>
        </Fragment>
    )

    render() {
        const {
            isCurrencyListVisible,
            isCurrencySet,
            activeCurrency,
            sum,
            tx,
            QRData
        } = this.state

        return (
            <div className="PopupPayment">
                <div className="Input">
                    <div className="Input__column">
                        <span className="Input__label">Криптовалюта</span>
                        <div 
                            className='Input__input Input__input_medium'
                            onClick={()=> this.setState({isCurrencyListVisible: !isCurrencyListVisible})}        
                        >
                            <div className="Input__select">
                                {this.getActiveCurrency()}
                                {this.getCurrencyList()}
                            </div>
                        </div>
                    </div>
                    {activeCurrency && <div className="Input__column">
                        <span className="Input__label">Сумма в {activeCurrency.symbol}</span>
                        <input
                            className='Input__input Input__input_medium'
                            value={sum}
                            placeholder='0.001'
                            onChange={e => this.setState({ sum: floatMask(e.target.value) })} 
                        />
                    </div>}
                    {/* <div className="Input__column">
                        <span className="Input__label">Сумма в рублях</span>
                        <input 
                            className='Input__input Input__input_short' 
                            placeholder='0.0000001'    
                        />
                    </div> */}
                </div>
                {this.getSteps(activeCurrency, sum, QRData)}
                <button
                    className="Button Button_purple Popup__submit"
                    onClick={this.handleSubmit}
                >Далее</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    payment: state.payment
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetSettings: () => dispatch(getSettings()),
        handleShowAlert: type => dispatch(showAlert(type)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentCrypto)