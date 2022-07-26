import React, { Component } from 'react';
import {Rnd} from "react-rnd";

import ChallengeWidget from "./_challenge";
import {
    CHALLENGE_WIDGET_FORMATS,
    INVITE_WIDGET_FORMATS,
    NOTIFICATION_WIDGET_ALERTS,
    NOTIFICATION_WIDGET_ANIMATIONS
} from 'Constants/widgets'
import { getItemByKey } from 'Utils'

import logo from 'Static/logo_planet.svg'
import deleteIcon from 'Static/widgets/widgets-delete.svg'

class Widget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: 'создай мне челлендж',
            isTransparent: true
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClickOutside, true)
    }

    replaceWidgetStringTemplate = (map, str) => {
        let newStr = str
        const keys = Object.keys(map)
        keys.forEach(item => newStr = newStr.split(`{${item}}`).join(map[item]))
        newStr = newStr.split('{link}').join(`<span class="Widgets__widgetMessage_link">satoorn.ru/${this.props.activeStreamer.login}</span>`)

        return newStr
    }

    getFormatByKey = (array, key) => array.reduce((acc, item) => {
        if(!acc) return item.key === key ? item : null
        else return acc
    }, null)

    getInviteWidget = () => {
        const {
            type,
            settings,
            position,
            size
        } = this.props
        const format = getItemByKey(INVITE_WIDGET_FORMATS, settings.format)

        return (
            <div
                className={`
                    Widgets__widget 
                    Widgets__widget_invite
                    Widgets__widget_invite${format.classnamePostfix} 
                    ${!settings.isTransparent ? 'Widgets__widget_notransparent' : ''}`}
                style={{
                    height: parseInt(this.props.size.width) * (format.key === 'top' ? 0.33 : 0.15),
                    padding: parseInt(this.props.size.width) * 0.03,
                    borderRadius: parseInt(this.props.size.width) * 0.015
                }}
            >
                <img
                    src={logo}
                    className="Widgets__widgetLogo"
                    style={{ height: parseInt(this.props.size.width) * 0.15 }}
                />
                <div className="Widgets__widgetText">
                    <p
                        className="Widgets__widgetMessage"
                        style={{ fontSize: parseInt(this.props.size.width) * (format.key === 'top' ? 0.067 : 0.055) }}
                    >{this.props.settings.text}</p>
                    <p
                        className="Widgets__widgetUrl"
                        style={{ fontSize: parseInt(this.props.size.width) * (format.key === 'top' ? 0.067 : 0.055) }}
                    >satoorn.ru/{this.props.activeStreamer.login}</p>
                </div>
            </div>
        )
    }

    getNotificationsWidget = () => {
        const {
            settings,
            size
        } = this.props
        const animation = settings.animation === 'random'
            ? NOTIFICATION_WIDGET_ANIMATIONS[Math.floor(Math.random() * NOTIFICATION_WIDGET_ANIMATIONS.length - 1) + 1]
            : getItemByKey(NOTIFICATION_WIDGET_ANIMATIONS, settings.animation)

        return (
            <div
                className={`
                    Widgets__widget 
                    Widgets__widget_notifications`}
                style={{
                    height: parseInt(size.width) * 0.6
                }}
            >
                <img
                    className="Widgets__widgetAnimation"
                    src={animation.gif}
                    style={{
                        height: parseInt(size.width) * 0.4,
                    }}
                />
                <p
                    className="Widgets__widgetMessage Widgets__widgetMessage_header"
                    style={{
                        fontSize: parseInt(size.width) * 0.057,
                        marginBottom: parseInt(size.width) * 0.012
                    }}
                    dangerouslySetInnerHTML={{__html: this.replaceWidgetStringTemplate(settings.placeholders, settings.header)}}
                />
                <p
                    className="Widgets__widgetMessage"
                    style={{fontSize: parseInt(size.width) * 0.031}}
                    dangerouslySetInnerHTML={{__html: this.replaceWidgetStringTemplate(settings.placeholders, settings.body)}}
                />
            </div>
        )
    }

    getChallengeWidget = () => {
        return (
            <ChallengeWidget {...this.props} />
        )
    }

    render() {
        const {
            id,
            isActive,
            size,
            position,
            type,
            updateProps,
            deleteWidget
        } = this.props

        return (
            <Rnd
                data-widgetid={id}
                bounds={'.Widgets__canvas'}
                className={`Widgets__widgetContainer ${isActive ? 'Widgets__widgetContainer_active' : ''}`}
                resizeHandleClasses={{
                    bottom: 'Widgets__widgetResize',
                    bottomLeft: 'Widgets__widgetResize',
                    bottomRight: 'Widgets__widgetResize',
                    left: 'Widgets__widgetResize',
                    right: 'Widgets__widgetResize',
                    top: 'Widgets__widgetResize',
                    topLeft: 'Widgets__widgetResize',
                    topRight: 'Widgets__widgetResize',
                }}
                size={{
                    width: size.width,
                    height: size.height
                }}
                position={{
                    x: position.x,
                    y: position.y
                }}
                lockAspectRatio={true}
                onDragStop={(e, d) => {
                    const newPosition = { x: d.x, y: d.y }
                    updateProps(this.props.id, {position: newPosition})
                }}
                onResize={(e, direction, ref, delta, position) => {
                    const newSize = { width: ref.style.width, height: ref.style.height }
                    updateProps(id, {size: newSize})
                }}
            >
                {type === 'invite' && this.getInviteWidget()}
                {type === 'notifications' && this.getNotificationsWidget()}
                {type === 'challenge' && this.getChallengeWidget()}
                <button
                    onClick={()=>deleteWidget(id)}
                    className="Widgets__widgetDelete"
                >
                    <img src={deleteIcon} alt=""/>
                </button>
            </Rnd>
        )
    }
}

export default Widget