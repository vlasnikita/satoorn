import React, { Component,Fragment } from 'react';

import {
    CHALLENGE_WIDGET_FORMATS,
    INVITE_WIDGET_FORMATS,
    NOTIFICATION_WIDGET_ANIMATIONS,
    WIDGET_TYPES
} from 'Constants/widgets'
import { generateWidgetPostfix } from "Fetchers";
import{HOSTING_ADDRESS} from 'Constants/routes'

import chooseChallengeIcon from "Static/widgets/widgets-choose-challenge-bg.svg";
import arrowIcon from "Static/widgets/widgets-arrow.svg";

class WidgetsSidebar extends Component {

    selectUrl = () => {
        document.querySelector('.Widgets__url input').select()
    }

    copyUrl = () => {
        this.selectUrl()
        document.execCommand('copy')

        const copyUrlButton = document.querySelector('.Widgets__copyurl')
        copyUrlButton.className = 'Button Button_purple Button_wide Widgets__copyurl Widgets__copyurl_copied'
        copyUrlButton.innerHTML = 'Готово!'
        setTimeout(() => {
            copyUrlButton.className = 'Button Button_purple Button_wide Widgets__copyurl'
            copyUrlButton.innerHTML = 'Скопировать'
        }, 1000)
    }

    getWidgetPostfix = () => {
        const { activeWidget, handleUpdateWidgetProps } = this.props
        const { id, type, settings, challenge } = activeWidget
        let payload

        if(type === 'challenge') {
            payload = {
                challengeId: challenge.id,
                meta: {
                    type,
                    format: settings.format
                }
            }
        }
        else if(type === 'notifications'){
            payload = {
                meta: {
                    type,
                    animation: settings.animation,
                    sound: settings.sound,
                    placeholders: settings.placeholders,
                    header: settings.header,
                    body: settings.body,
                    login: this.props.activeStreamer.login
                }
            }
        }
        else if(type === 'invite'){
            payload = {
                meta: {
                    type,
                    format: settings.format,
                    text: settings.text,
                    isTransparent: settings.isTransparent,
                    login: this.props.activeStreamer.login
                }
            }
        }

        if(payload) {
            payload = {
                ...payload,
                meta: JSON.stringify(payload.meta)
            }
            generateWidgetPostfix(payload)
                .then(res => res.text())
                .then(postfix => {
                    console.log(id)
                    console.log(postfix)
                    console.log(postfix.body)
                    handleUpdateWidgetProps(id, {postfix})
                })
                .catch(console.log)

        }
    }

    renderSettings = () => {
        const { activeWidget, handleUpdateWidgetProps } = this.props
        const { type, settings, postfix, challenge } = activeWidget
        if(type === 'invite') {
            return (
                <div className="Widgets__body">
                    <div className="Island Widgets__block Widgets__block_first">
                        <span className="Widgets__text Widgets__text_normal">Текст приглашения</span>
                        <input
                            autoComplete="off"
                            name='text'
                            id='text'
                            type='text'
                            className={`CreateChallenge__input Widgets__input`}
                            value={settings.text}
                            onChange={e => {
                                const settings = {
                                    ...activeWidget.settings,
                                    text: e.target.value
                                }
                                handleUpdateWidgetProps(activeWidget.id, {settings})
                            }}
                        />
                    </div>

                    <div className="Island Widgets__block Widgets__block_middle">
                        <span className="Widgets__text Widgets__text_normal">Выравнивание</span>
                        <div className="Widgets__format Widgets__format_invite">
                            {INVITE_WIDGET_FORMATS.map((item, i) => (
                                <button
                                    key={i}
                                    className={`
                                    Widgets__formatItem 
                                    Widgets__formatItem_invite 
                                    Widgets__formatItem_invite${item.classnamePostfix} 
                                    ${settings.format === item.key ? 'Widgets__formatItem_active' : ''}`}
                                    onClick={() => {
                                        const settings = {
                                            ...activeWidget.settings,
                                            format: item.key
                                        }
                                        handleUpdateWidgetProps(activeWidget.id, {settings})
                                    }}
                                >
                                    <img src={item.icon}/>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="Island Widgets__block Widgets__block_row Widgets__block_last">
                        <input
                            autoComplete="off"
                            name='transparent'
                            id='transparent'
                            type='checkbox'
                            className={`CreateChallenge__input Widgets__input Widgets__input_checkbox`}
                            checked={settings.isTransparent}
                            onChange={e => {
                                const settings = {
                                    ...activeWidget.settings,
                                    isTransparent: e.target.checked
                                }
                                handleUpdateWidgetProps(activeWidget.id, {settings})
                            }}
                        />
                        <label htmlFor="transparent" className="Widgets__text Widgets__text_mgleft">Прозрачный фон</label>
                    </div>

                    <div className="Island Widgets__block">
                        <p className="Widgets__text Widgets__text_normal">Урл для OBS/Xsplit</p>
                        <div className="Widgets__url">
                            {postfix ?
                                <Fragment>
                                    <input
                                        type="text"
                                        value={`${HOSTING_ADDRESS}/${postfix}`}
                                        onFocus={this.selectUrl}
                                        onClick={this.selectUrl}
                                    />
                                    <button
                                        className="Button Button_purple Button_wide Widgets__copyurl"
                                        onClick={this.copyUrl}
                                    >Скопировать
                                    </button>
                                </Fragment>
                                :
                                <button
                                    className="Button Button_purple Button_wide Widgets__copyurl"
                                    onClick={this.getWidgetPostfix}
                                >Показать URL виджета
                                </button>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if(type === 'challenge') {
            return (
                <div className="Widgets__body">
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal">Челлендж</span>
                        <p className="Widgets__text">{challenge.title}</p>
                    </div>
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal">Формат</span>
                        <div className="Widgets__format">
                            {CHALLENGE_WIDGET_FORMATS.map(item => (
                                <button
                                    key={item.key}
                                    className={`Widgets__formatItem ${settings.format === item.key ? 'Widgets__formatItem_active' : ''}`}
                                    onClick={() => {
                                        const settings = {
                                            ...activeWidget.settings,
                                            format: item.key
                                        }
                                        handleUpdateWidgetProps(activeWidget.id, {settings})
                                    }}
                                >
                                    <p className="Widgets__formatLabel">{item.name}</p>
                                    <img src={item.icon}/>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="Island Widgets__block">
                        <p className="Widgets__text Widgets__text_normal">Урл для OBS/Xsplit</p>
                        <div className="Widgets__url">
                            {postfix ?
                                <Fragment>
                                    <input
                                        type="text"
                                        value={`${HOSTING_ADDRESS}/${postfix}`}
                                        onFocus={this.selectUrl}
                                        onClick={this.selectUrl}
                                    />
                                    <button
                                        className="Button Button_purple Button_wide Widgets__copyurl"
                                        onClick={this.copyUrl}
                                    >Скопировать
                                    </button>
                                </Fragment>
                                :
                                <button
                                    className="Button Button_purple Button_wide Widgets__copyurl"
                                    onClick={this.getWidgetPostfix}
                                >Показать URL виджета
                                </button>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if(type === 'notifications'){
            return (
                <div className="Widgets__body">
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal">Анимация</span>
                        <div className="Widgets__format">
                            {NOTIFICATION_WIDGET_ANIMATIONS.map(item => (
                                <button
                                    key={item.key}
                                    className={`Widgets__formatItem Widgets__formatItem_notifications ${settings.animation === item.key ? 'Widgets__formatItem_active' : ''}`}
                                    onClick={() => {
                                        const settings = {
                                            ...activeWidget.settings,
                                            animation: item.key
                                        }
                                        handleUpdateWidgetProps(activeWidget.id, {settings})
                                    }}
                                ><img src={item.gif}/></button>
                            ))}
                            <button
                                className={`Widgets__formatItem Widgets__formatItem_notifications ${settings.animation === 'random' ? 'Widgets__formatItem_active' : ''}`}
                                onClick={() => {
                                    const settings = {
                                        ...activeWidget.settings,
                                        animation: 'random'
                                    }
                                    handleUpdateWidgetProps(activeWidget.id, {settings})
                                }}
                            >
                                <span>Случайная анимация</span>
                            </button>
                        </div>
                    </div>
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal">Заголовок</span>
                        <input
                            autoComplete="off"
                            type='text'
                            className={`CreateChallenge__input Widgets__input`}
                            value={settings.header}
                            onChange={e => {
                                const settings = {
                                    ...activeWidget.settings,
                                    header: e.target.value
                                }
                                handleUpdateWidgetProps(activeWidget.id, {settings})
                            }}
                        />
                    </div>
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal">Сообщение</span>
                        <input
                            autoComplete="off"
                            type='text'
                            className={`CreateChallenge__input Widgets__input`}
                            value={settings.body}
                            onChange={e => {
                                const settings = {
                                    ...activeWidget.settings,
                                    body: e.target.value
                                }
                                handleUpdateWidgetProps(activeWidget.id, {settings})
                            }}
                        />
                    </div>
                    <div className="Island Widgets__block">
                        <span className="Widgets__text Widgets__text_normal"><b>{'{amount}'}</b> - сумма доната</span>
                        <span className="Widgets__text Widgets__text_normal"><b>{'{username}'}</b> - ник донатера</span>
                        <span className="Widgets__text Widgets__text_normal"><b>{'{title}'}</b> - название челленджа</span>
                        <span className="Widgets__text Widgets__text_normal"><b>{'{link}'}</b> - ссылка на мой канал</span>
                    </div>
                    <div className="Island Widgets__block">
                        <p className="Widgets__text Widgets__text_normal">Урл для OBS/Xsplit</p>
                        <div className="Widgets__url">
                            {postfix ?
                                <Fragment>
                                    <input
                                        type="text"
                                        value={`${HOSTING_ADDRESS}/${postfix}`}
                                        onFocus={this.selectUrl}
                                        onClick={this.selectUrl}
                                    />
                                    <button
                                        className="Button Button_purple Button_wide Widgets__copyurl"
                                        onClick={this.copyUrl}
                                    >Скопировать
                                    </button>
                                </Fragment>
                                :
                                <button
                                    className="Button Button_purple Button_wide Widgets__copyurl"
                                    onClick={this.getWidgetPostfix}
                                >Показать URL виджета
                                </button>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        const {
            activeWidget,
            showChallengesFeed,
            resetSidebar,
            emitNewWidget,
            handleShowChallengesFeed
        } = this.props

        // Показываем настройки виджета, если есть активный-выделенный на канвасе
        if(activeWidget) {
            return (
                <div className="Widgets__sidebar">
                    <div className="Widgets__sidebarHeader">
                        <button
                            className="Button Button_greytext Widgets__button"
                            onClick={resetSidebar}
                        ><img src={arrowIcon}/></button>
                        <h1 className="Widgets__sidebarHeaderText">РЕДАКТИРОВАНИЕ</h1>
                    </div>
                    {this.renderSettings(activeWidget)}
                </div>
            )
        }

        // Пустой сайдбар, пока стример выбирает челленджи в фиде на канвасе
        else if(showChallengesFeed){
            return (
                <div className="Widgets__sidebar">
                    <div className="Widgets__sidebarHeader">
                        <button
                            className="Button Button_greytext Widgets__button"
                            onClick={resetSidebar}
                        ><img src={arrowIcon}/></button>
                        <h1 className="Widgets__sidebarHeaderText">ВЫБЕРИ ЧЕЛЛЕНДЖ</h1>
                    </div>
                    <div className="Widgets__sidebarIconContainer">
                        <img
                            className="Widgets__sidebarIcon"
                            src={chooseChallengeIcon}
                        />
                    </div>
                </div>
            )
        }

        // Дефолтное состояние, добавление новых виджетов
        else {
            return (
                <div className="Widgets__sidebar">
                    <div className="Widgets__sidebarHeader">
                        <h1 className="Widgets__sidebarHeaderText">ДОБАВИТЬ ВИДЖЕТ:</h1>
                    </div>
                    <div className="Widgets__sidebarList">
                        {WIDGET_TYPES.map(item => (
                            <button
                                className="Widgets__sidebarItem"
                                key={item.key}
                                onClick={()=>{
                                    if(item.key === 'challenge') handleShowChallengesFeed()
                                    else emitNewWidget(item.key)
                                }}
                            >
                                <div className="Widgets__sidebarItemIconContainer">
                                    <img
                                        className="Widgets__sidebarItemIcon"
                                        src={item.icon}
                                        height={item.height}
                                    />
                                </div>
                                <p className="Widgets__sidebarItemText">{item.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default WidgetsSidebar
