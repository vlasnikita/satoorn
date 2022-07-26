import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";

import {logUserAction} from 'Utils/metrics';

import challengesIcon from "Static/sidebar/sidebar-challenges.svg";
import streamersIcon from "Static/sidebar/sidebar-streamers.svg";
import homeIcon from "Static/sidebar/sidebar-home.svg";
import helpIcon from "Static/sidebar/sidebar-help.svg";
import aboutIcon from "Static/sidebar/sidebar-about.svg";
import emailIcon from "Static/sidebar/sidebar-email.svg";
import howitworksIcon from "Static/sidebar/sidebar-howitworks.svg";
import widgetsIcon from "Static/sidebar/sidebar-widgets.svg";

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: true
        }
    }

    componentDidMount() {
        const active = document.querySelector('.Sidebar__item_active')
        if (active) active.className = 'Sidebar__item Sidebar__item_active Sidebar__item_active_mounted'
    }

    componentDidUpdate() {
        const active = document.querySelector('.Sidebar__item_active')
        if (active) setTimeout(() => active.className = 'Sidebar__item Sidebar__item_active Sidebar__item_active_mounted', 300)
    }

    getMenu = () => {
        return <div className="Sidebar__menu">
            {this.props.profile.id && <NavLink
                exact
                eventContext='MY_PAGE'
                onClick={() => this.logEventCheckingProfile('MY_PAGE')}
                isActive={() =>
                    this.props.location.pathname.includes(`/${this.props.profile.login}`) &&
                    !this.props.location.pathname.includes('widgets')}
                className={`Sidebar__item Sidebar__item_withMenu`}
                id="Sidebar__item_mypage"
                activeClassName="Sidebar__item_active"
                to={`/${this.props.profile.login}`}>
                        <span className="Sidebar__iconContainer">
                        <img
                            src={homeIcon}
                            alt="Моя страница"
                            className="Sidebar__icon"
                            height={20}
                        />
                        </span>
                <p className='Sidebar__text'>Моя страница</p>
            </NavLink>}
            <NavLink
                eventContext='CHALLENGES'
                onClick={() => this.logEventCheckingProfile('CHALLENGES')}
                isActive={() => this.props.location.pathname === "/challenges"}
                className="Sidebar__item"
                id="Sidebar__item_challenges"
                activeClassName="Sidebar__item_active"
                to="/challenges">
                        <span className="Sidebar__iconContainer">
                            <img
                                src={challengesIcon}
                                alt="Челленджи"
                                className="Sidebar__icon"
                                height={20}
                            />
                        </span>
                <p className="Sidebar__text">Челленджи</p>
            </NavLink>
            <NavLink
                eventContext='STREAMERS'
                onClick={() => this.logEventCheckingProfile('STREAMERS')}
                isActive={() => this.props.location.pathname === "/streamers"}
                className="Sidebar__item"
                id="Sidebar__item_streamers"
                activeClassName="Sidebar__item_active"
                to="/streamers">
                        <span className="Sidebar__iconContainer">
                            <img
                                src={streamersIcon}
                                alt="Стримеры"
                                className="Sidebar__icon"
                                height={22}
                            />
                        </span>
                <p className="Sidebar__text">Стримеры</p>
            </NavLink>
            {this.props.profile.id && <NavLink
                eventContext='WIDGETS'
                onClick={() => this.logEventCheckingProfile('WIDGETS')}
                isActive={() => this.props.location.pathname.includes(`/${this.props.profile.login}/widgets`)}
                className="Sidebar__item"
                id="Sidebar__item_widgets"
                activeClassName="Sidebar__item_active"
                to={`/${this.props.profile.login}/widgets`}>
                        <span className="Sidebar__iconContainer">
                        <img
                            src={widgetsIcon}
                            alt="Виджеты"
                            className="Sidebar__icon"
                            height={16}
                        />
                        </span>
                <p className='Sidebar__text'>Виджеты</p>
            </NavLink>}
            <NavLink
                eventContext='HOWITWORKS'
                onClick={() => this.logEventCheckingProfile('HOWITWORKS')}
                isActive={() => this.props.location.pathname.includes("/how-it-works")}
                className="Sidebar__item"
                id="Sidebar__item_howitworks"
                activeClassName="Sidebar__item_active"
                to="/how-it-works">
                        <span className="Sidebar__iconContainer">
                        <img
                            src={howitworksIcon}
                            alt="Как это работает"
                            className="Sidebar__icon"
                            height={20}
                        />
                        </span>
                <p className="Sidebar__text">О сервисе</p>
            </NavLink>
            {this.props.profile.id && <NavLink
                eventContext='HELP'
                onClick={() => this.logEventCheckingProfile('HELP')}
                isActive={() => this.props.location.pathname.includes("/help")}
                className="Sidebar__item"
                id="Sidebar__item_help"
                activeClassName="Sidebar__item_active"
                to="/help">
                        <span className="Sidebar__iconContainer">
                        <img
                            src={helpIcon}
                            alt="Помощь"
                            className="Sidebar__icon"
                            height={20}
                        />
                        </span>
                <p className="Sidebar__text">Помощь</p>
            </NavLink>}
            <NavLink
                eventContext='ABOUT'
                onClick={() => this.logEventCheckingProfile('ABOUT')}
                isActive={() => this.props.location.pathname.includes("/about")}
                className="Sidebar__item"
                id="Sidebar__item_about"
                activeClassName="Sidebar__item_active"
                to="/about">
                        <span className="Sidebar__iconContainer">
                        <img
                            src={aboutIcon}
                            alt="Документы"
                            className="Sidebar__icon"
                            height={20}
                        />
                        </span>
                <p className="Sidebar__text">Документы</p>
            </NavLink>
        </div>
    }

    render() {
        const isWidgets = this.props.location && this.props.location.pathname && this.props.location.pathname.split('/').pop() === 'widgets'

        return  (
            <div className='Sidebar'>
                {this.getMenu()}
                <div className="Sidebar__footer">
                    <a href="mailto:help@satoorn.ru">
                        <img
                            src={emailIcon}
                            alt="Моя страница"
                            className="Sidebar__icon"
                            height={20}
                        />
                    </a>
                </div>
            </div>
        )
    }

    logEventCheckingProfile = (context) => {
        let userId = !!this.props.profile.id ? this.props.profile.id : null
        logUserAction('SIDEBAR_ITEM', context, userId)
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile
})

export default withRouter(connect(mapStateToProps)(Sidebar))

