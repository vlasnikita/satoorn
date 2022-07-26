import React, {Component} from 'react';
import {connect} from 'react-redux';

import {MainPure} from './index'
import Layout from "Components/Layout";
import Header from "Components/Header";
import StreamersFeed from "Components/StreamersFeed";
import FiltersBar from "Components/FiltersBar";

import {getMinPayment, getSettings} from "Actions/configs";
import {getNotifications} from "Actions/notifications";
import {resetActiveStreamer} from "Actions/streamers";

class MainStreamers extends MainPure {
    render() {
        return (
            <div className="Main">
                <span className="Main__cover"/>
                <FiltersBar isStreamer/>
                <StreamersFeed/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    streamers: state.streamers,
    configs: state.configs,
    notifications: state.notifications,
    activeStreamer: state.activeStreamer.activeStreamer
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetSettings: () => dispatch(getSettings()),
        handleGetMinPayment: () => dispatch(getMinPayment()),
        handleGetNotifications: () => dispatch(getNotifications()),
        handleResetActiveStreamer: () => dispatch(resetActiveStreamer())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStreamers);