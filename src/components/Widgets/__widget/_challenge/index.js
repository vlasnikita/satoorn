import React, {Component} from 'react';

import {getTierNumber} from 'Utils/challenge_tiers';

import heartIcon from 'Static/challenge/heart.svg'
import logoShort from 'Static/logo_short.png'
import {getItemByKey} from "Utils";
import {CHALLENGE_WIDGET_FORMATS} from "Constants/widgets";

export class ChallengeWidget extends Component {

    getPrice = () => {
        const donationAmount = this.props.challenge
        return (
            <div className="Challenge__price">
                <p
                    className={`Challenge__priceText Challenge__priceText_t${getTierNumber(donationAmount)}`}
                    style={{
                        fontSize: parseInt(this.props.size.width) * 0.12
                    }}
                >
                    {('' + donationAmount).split(/\D/).join('')}
                    <span
                        className="Challenge__priceText_currency"
                        style={{
                            fontSize: parseInt(this.props.size.width) * 0.115
                        }}
                    >₽</span>
                </p>
            </div>
        )
    };

    renderCard = () => {
        const {
            streamerLogin,
            title,
            donatedPersonCount,
            donationAmount
        } = this.props.challenge

        const {
            size,
            settings
        } = this.props

        const format = getItemByKey(CHALLENGE_WIDGET_FORMATS, settings.format)

        return (
            <div
                className={`
                    Challenge 
                    Widgets__widget 
                    Widgets__widget_challenge
                    Widgets__widget_challenge${format.classnamePostfix}`}
                style={{
                    padding: parseInt(size.width) * 0.03,
                    borderRadius: parseInt(size.width) * 0.015
                }}
            >
                <div
                    className="Challenge__header"
                    style={{
                        height: parseInt(this.props.size.width) * 0.18
                    }}
                >
                    <div className="Challenge__streamer">
                        <img
                            src={logoShort}
                            className="Challenge__streamerAvatar"
                            style={{
                                height: parseInt(this.props.size.width) * 0.16,
                                minWidth: parseInt(this.props.size.width) * 0.16,
                                width: parseInt(this.props.size.width) * 0.16,
                                borderWidth: parseInt(this.props.size.width) * 0.01
                            }}
                        />
                        <p
                            className="Challenge__streamerLogin"
                            style={{
                                fontSize: parseInt(this.props.size.width) * 0.06
                            }}
                        >satoorn.ru/<span>{streamerLogin}</span></p>
                    </div>
                </div>
                <div
                    className="Challenge__cover"
                    style={{
                        height: parseInt(this.props.size.width) * 0.2
                    }}
                >
                <div className="Challenge__price">
                    <p
                        className={`Challenge__priceText Challenge__priceText_t${getTierNumber(donationAmount)}`}
                        style={{
                            fontSize: parseInt(this.props.size.width) * 0.12
                        }}
                    >
                        {('' + donationAmount).split(/\D/).join('')}
                        <span
                            className="Challenge__priceText_currency"
                            style={{
                                fontSize: parseInt(this.props.size.width) * 0.115
                            }}
                        >₽</span>
                    </p>
                </div>
                </div>
                <div className="Challenge__body">
                    <p
                        className="Challenge__title"
                        style={{
                            fontSize: parseInt(this.props.size.width) * 0.065
                        }}
                    >{title}</p>
                </div>
                <div className="Challenge__metaDonaters">
                    <img
                        src={heartIcon}
                        className="Challenge__metaIcon"
                        style={{
                            height: parseInt(this.props.size.width) * 0.06,
                            width: parseInt(this.props.size.width) * 0.06
                        }}
                    />
                    <div
                        className="Challenge__metaText"
                        style={{
                            fontSize: parseInt(this.props.size.width) * 0.05,
                            lineHeight: parseInt(this.props.size.width) * 0.05 + 'px'
                        }}
                    >{donatedPersonCount || 1}&nbsp;<span
                        style={{
                            fontWeight: 'normal'
                        }}
                    >задонатило</span></div>
                </div>
            </div>
        )
    }

    renderLine = () => {
        const {
            streamerLogin,
            title,
            donatedPersonCount,
            donationAmount
        } = this.props.challenge

        const {
            size,
            settings
        } = this.props

        const format = getItemByKey(CHALLENGE_WIDGET_FORMATS, settings.format)

        return (
            <div
                className={`
                    Challenge 
                    Widgets__widget 
                    Widgets__widget_challenge
                    Widgets__widget_challenge${format.classnamePostfix}`}
                style={{
                    padding: parseInt(size.width) * 0.03,
                    borderRadius: parseInt(size.width) * 0.015
                }}
            >
                <div
                    className="Challenge__header"
                    style={{
                        height: parseInt(size.width) * 0.13
                    }}
                >
                    <div className="Challenge__streamer">
                        <img
                            src={logoShort}
                            className="Challenge__streamerAvatar"
                            style={{
                                height: parseInt(this.props.size.width) * 0.13,
                                minWidth: parseInt(this.props.size.width) * 0.13,
                                width: parseInt(this.props.size.width) * 0.13
                            }}

                        />
                        <p
                            className={`Challenge__streamerLogin`}
                            style={{
                                fontSize: parseInt(this.props.size.width) * 0.046
                            }}
                        >
                            satoorn.ru/<br/>{streamerLogin}
                        </p>
                    </div>
                    <div className="Challenge__price">
                        <p
                            className={`Challenge__priceText Challenge__priceText_t${getTierNumber(donationAmount)}`}
                            style={{
                                fontSize: parseInt(this.props.size.width) * 0.09
                            }}
                        >
                            {('' + donationAmount).split(/\D/).join('')}
                            <span
                                className="Challenge__priceText_currency"
                                style={{
                                    fontSize: parseInt(this.props.size.width) * 0.085
                                }}
                            >₽</span>
                        </p>
                    </div>
                </div>
                <p
                    className="Challenge__title"
                    style={{
                        fontSize: parseInt(size.width) * 0.063
                    }}
                >{title}</p>
            </div>
        )
    }

    render() {
        if(this.props.settings.format === 'card') return this.renderCard()
        else if(this.props.settings.format === 'line') return this.renderLine()
        else return null
    }
}

export default ChallengeWidget
