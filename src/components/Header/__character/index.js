import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";

import Notifications from '../__notifications'

import { openPopup, closePopup } from "Actions/popup";
import { getProfile } from "Actions/profile";
import { getMinPayment, getSettings } from "Actions/configs";
import { getNotifications } from "Actions/notifications";
import POPUP_TYPE from 'Constants/popup_type'
import {ROUTE_LOGOUT} from "Constants/routes";

import bell from 'Static/bell.svg'
import { logUserAction } from '../../../utils/metrics';

class Character extends Component {

    state = {
        isMenuOpened: false,
        isNotificationsOpened: false,
        isUnauthClicked: false,
    }

    componentDidMount(){
        document.addEventListener('click', this.hideMenu)
        this.getInitialData()
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.hideMenu)
    }

    componentDidUpdate(){
        this.getInitialData()
    }

    hideMenu = event => {
        const characterNode = document.querySelector('.Character')

        if (!characterNode || !characterNode.contains(event.target)) {
            this.setState({ isMenuOpened: false })
        }
    }

    getInitialData = () => {
        const {
            minPaymentAmountLoading, minPaymentAmountLoaded,
            settingsLoading, settingsLoaded,
            handleGetNotifications,
            handleGetSettings, handleGetMinPayment
        } = this.props

        if(!this.props.isProfileLoaded) this.props.handleGetProfile()
        if (!minPaymentAmountLoading && !minPaymentAmountLoaded) handleGetMinPayment()
        if (!settingsLoading && !settingsLoaded) handleGetSettings()
        if (this.requireToLoadNotifications()) handleGetNotifications()
    }

    getBell = () => {
        return (
            <div
                className={this.renderNotificationsCheckingUnread()}
                onClick={e => this.handleBellClickLoggingAction()}
            >
                <img
                    className='Character__bellImage'
                    src={bell}
                    alt="Уведомления"
                    height={18}
                />
                {this.state.isNotificationsOpened 
                    && 
                <Notifications handleClickOutside={this.handleClickOutside} notifications={this.props.notifications} />}
            </div>
        )
    }

    handleClickOutside = () => {
        this.props.handleGetNotifications()
        this.setState({ isNotificationsOpened: false });
    }

    requireToLoadNotifications() {
        const {profile, notificationsLoading, notificationsLoaded} = this.props
        return profile.id && !notificationsLoading && !notificationsLoaded;
    }

    handleBellClickLoggingAction() {
        logUserAction('NOTIFICATIONS', this.resolveActionToLog(), this.props.profile.id)
        return this.setState({ isNotificationsOpened: true });
    }

    resolveActionToLog() {
        return this.state.isNotificationsOpened ? 'CLOSED' : 'OPENED';
    }

    renderNotificationsCheckingUnread() {
        return `Character__bell 
                ${this.hasUnreadNotifications() && 'Character__bell_unread'} 
                ${this.state.isNotificationsOpened && 'Character__bell_opened'}`;
    }

    hasUnreadNotifications() {
        return this.props.notifications.some(notification => !notification.read)
    }

    renderLoginButtons = () => {
        return (
            <div className="Character">
                <button 
                    className="Button Button_yellowtext"
                    onClick={()=> this.props.handleOpenPopup(POPUP_TYPE.UNREGISTRED)}    
                >Войти</button>
            </div>
        )
    }

    render() {
        if(!this.props.profile.id) return this.renderLoginButtons()
        else return (
            <div className="Character">
                {this.getBell()}
                <div className={`Character__avatarContainer ${this.state.isMenuOpened ? 'Character__avatarContainer_active' : ''}`}>
                    <img
                        src={this.props.profile.externalPhotoLink}
                        alt={this.props.profile.login}
                        className='Character__avatar'
                        onClick={()=>this.setState({isMenuOpened: !this.state.isMenuOpened})}
                    />
                    <div className="Character__dropdown">
                        <div className="Character__dropdownLoginContainer">
                            <p className="Character__dropdownLogin">{this.props.profile.login}</p>
                        </div>
                        <div className="Character__dropdownList">
                            <a href={ROUTE_LOGOUT} className="Character__dropdownItem">выйти</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    isProfileLoaded: state.profile.loaded,
    activeStreamer: state.activeStreamer.activeStreamer,

    notifications: state.notifications.notifications,
    notificationsLoading: state.notifications.loading,
    notificationsLoaded: state.notifications.loaded,

    minPaymentAmountLoading: state.configs.minPaymentAmount.loading,
    minPaymentAmountLoaded: state.configs.minPaymentAmount.loaded,
    settingsLoading: state.configs.settings.loading,
    settingsLoaded: state.configs.settings.loaded,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetProfile: () => dispatch(getProfile()),
        handleGetSettings: () => dispatch(getSettings()),
        handleGetMinPayment: () => dispatch(getMinPayment()),
        handleGetNotifications: () => dispatch(getNotifications()),
        handleOpenPopup: (type) => dispatch(openPopup(type))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Character)