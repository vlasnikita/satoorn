import React, {Component} from 'react';
import {connect} from 'react-redux';

import NotFound from "Components/NotFound";
import UserPage from "./__page";
import { setActiveStreamer, setActiveStreamerClientside } from "Actions/streamers";

class User extends Component {


    componentDidMount() {

        const { loaded, loading, notFound } = this.props.activeStreamer
        if(!notFound) {

            const { login, id } = this.props.profile
            const { username } = this.props.match.params

            const isMyPage = !!id && username === login

            if(!loading && !loaded){
                isMyPage
                    ? this.props.handleSetActiveStreamerClientside(this.props.profile)
                    : this.props.handleSetActiveStreamer(username)
            }
        }
    }

    componentDidUpdate(){
        const { loading, activeStreamer } = this.props.activeStreamer
        if(!activeStreamer.notFound){

            const { username } = this.props.match.params // Логин из урла
            const { login, id } = this.props.profile // Логин из авторизованного профиля

            const isMyPage = !!id && username === login
            const isUpdateNecessary = username !== activeStreamer.login

            if(!loading && isUpdateNecessary){
                isMyPage
                    ? this.props.handleSetActiveStreamerClientside(this.props.profile)
                    : this.props.handleSetActiveStreamer(username)
            }
        }
    }

    render() {
        const { loaded, loading, activeStreamer } = this.props.activeStreamer

        if(activeStreamer.notFound) return <NotFound/>
        else {

            const { login, id } = this.props.profile
            const { username } = this.props.match.params

            const isMyPage = !!id && username === login

            if (loading || !loaded) return null;
            else return  <UserPage isMyPage={isMyPage}/>
        }
    }
}

const mapStateToProps = (state) => ({
    activeStreamer: state.activeStreamer,
    profile: state.profile.profile
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetActiveStreamer: name => dispatch(setActiveStreamer(name)),
        handleSetActiveStreamerClientside: streamer => dispatch(setActiveStreamerClientside(streamer))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User)
