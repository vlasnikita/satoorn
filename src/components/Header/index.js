import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect, NavLink} from "react-router-dom";

import Popup from 'Components/Popup'
import Character from './__character'
import Sidebar from './__sidebar'
import Logo from "./__logo";
import Alert from 'Components/Alert'

import { toggleCommonOnboarding } from 'Fetchers/index'
import { logUserAction } from "Utils/metrics";
import { checkIfNoOuterUIPage } from 'Utils'
import { getSettings } from "Actions/configs";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    acceptOnboarding = () => {
        localStorage.setItem('__SATOORN__clientOnboardingConfirmed', 'true')
        logUserAction('ONBOARDING', 'CONFIRMED', this.getProfileData().id)
        if(!!this.getProfileData().id) {
            toggleCommonOnboarding()
                .then(() => {
                    localStorage.removeItem('__SATOORN__clientOnboardingConfirmed')
                    this.props.handleGetSettings()
                })    
        }
        else {
            this.forceUpdate()
        }
    }

    isOnboardedInSettingsOrInSession = () => {
        if(!this.getProfileData().id && this.props.profile.loaded) {
            return !!localStorage.getItem('__SATOORN__clientOnboardingConfirmed');
        } 
        return this.props.settings.value.serviceOnboardingConfirmed || !this.props.settings.loaded
    }

    getProfileData() {
        return this.props.profile.profile;

    }

    render() {
        if(checkIfNoOuterUIPage()) return null;
        if (this.props.location.pathname !== '/how-it-works' && !this.isOnboardedInSettingsOrInSession()) return <Redirect to='/how-it-works'/>;

        return (
            <Fragment>
                <div className='Header'>
                    <NavLink to="/" className="Header__logo">
                        <Logo />
                    </NavLink>
                    <Character/>
                </div>
                <Sidebar location={this.props.location} />
                {this.props.popup.opened && <Popup />}
                {this.props.alert.opened && <Alert/>}
            </Fragment>
        )
    }

}

const mapStateToProps = (state) => ({
    popup: state.popup,
    profile: state.profile,
    alert: state.alert,
    unregistred: state.unregistred,
    activeStreamer: state.activeStreamer,
    activeChallenge: state.activeChallenge,
    settings: state.configs.settings
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetSettings: () => dispatch(getSettings())
    }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))