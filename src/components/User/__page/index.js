import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter } from "react-router-dom"

import UserInfo from "Components/UserInfo/";
import UserRouter from "../__router";
import UserNavbar from "../__navbar";

export class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createChallengeDescription: '',
            templateDescription: '',
            templateDescriptionClicked: false
        }
    }

    componentDidMount() {
        this.animateCreateChallengeHeader()
    }

    componentDidUpdate() {
        this.animateCreateChallengeHeader()
    }

    animateCreateChallengeHeader = () => {
        const createChallengeHeader = document.querySelector('.User_create_pending')
        console.log(createChallengeHeader)
        if(!!createChallengeHeader){
            createChallengeHeader.className = 'Container User User_create'
        }
    }

    getHeader = () => {
        return (
            <div className="User__header" ref={this.domNode}>
                <UserInfo
                    streamer={this.props.activeStreamer}
                    location={this.props.location}
                />
                <UserNavbar
                    isMyPage={this.props.isMyPage}
                    match={this.props.match}
                />
            </div>
        )
    }

    render() {
        if(!this.props.isActiveStreamerLoaded) return <div className="User"/>
        else return (
            <div className={`Container User ${window.location.href.split('/').pop() === 'create' ? 'User_create_pending' : ''}`}>
                {this.getHeader()}
                <UserRouter
                    match={this.props.match}
                    activeStreamer={this.props.activeStreamer}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeStreamer: state.activeStreamer.activeStreamer,
    isActiveStreamerLoading: state.activeStreamer.loading,
    isActiveStreamerLoaded: state.activeStreamer.loaded,
    profile: state.profile.profile,
    challengeDraft: state.createChallenge.challengeDraft
});

export default withRouter(connect(mapStateToProps)(UserPage))
