import React, {Component} from 'react';
import {connect} from 'react-redux';

import Challenge from "Components/Challenge";
import {getChallenges, getChallengesByUserId, getMoreChallenges, getMoreChallengesByUserId} from "Actions/challenges";

import finishIcon from 'Static/finish.png';


class ChallengesFeed extends Component {
    state = {
        isFirstLoading: true
    }

    componentDidMount() {
        if(this.props.documentTitle) document.title = this.props.documentTitle

        const {
            searchTerm, filter,
            activeStreamerSearchTerm, activeStreamerFilter,
            activeStreamer, isUser,
            handleGetChallengesByUserId, handleGetChallenges
        } = this.props

        // фечим челленджи в зависимости от того, где мы: на моей странице/на странице другого юзера/на главной странице
        if (isUser) handleGetChallengesByUserId(activeStreamer.id, activeStreamerFilter, activeStreamerSearchTerm)
        else handleGetChallenges(filter, searchTerm)


        const div = document.querySelector('.OrdersFeed')
        if (!!div) {
            // подгрузка данных при доскролливании до низа страницы
            div.addEventListener('scroll', this.handleScroll)

        }
    }

    handleScroll = e => {
        const div = e.target
        const {
            isChallengesLoading, isUser,
            searchTerm, filter,
            activeStreamerSearchTerm, activeStreamerFilter,
            activeStreamer, activeStreamerChallenges, challenges,
            handleGetMoreChallengesByUserId, handleGetMoreChallenges
        } = this.props

        if (!isChallengesLoading && div.scrollTop + div.clientHeight > div.scrollHeight - 200) {
            if (isUser) handleGetMoreChallengesByUserId(activeStreamer.id, activeStreamerChallenges.length + 1, activeStreamerFilter, activeStreamerSearchTerm)
            else handleGetMoreChallenges(challenges.length + 1, filter, searchTerm)
        }
    }

    componentWillUpdate() {
        if (this.state.isFirstLoading && this.props.isChallengesLoaded) this.setState({isFirstLoading: false})
    }

    componentDidUpdate() {
        if (this.props.isFiltersUpdated) this.refetchChallenges()
    }

    componentWillUnmount() {
        const div = document.querySelector('.OrdersFeed')
        div.removeEventListener('scroll', () => {
        })
    }

    getProperChallenges = () => {
        if (this.props.isUser) return this.props.activeStreamerChallenges
        else return this.props.challenges
    }

    refetchChallenges = () => {
        const {
            searchTerm, filter,
            activeStreamerSearchTerm, activeStreamerFilter,
            activeStreamer, isUser,
            handleGetChallengesByUserId, handleGetChallenges,
        } = this.props

        if (isUser) handleGetChallengesByUserId(activeStreamer.id, activeStreamerFilter, activeStreamerSearchTerm)
        else handleGetChallenges(filter, searchTerm)
    }

    getFirstLoadingScreen = () => (
        <div className="OrdersFeed">
            <div className="OrdersFeed__body">
                {'123456789'.split('').map(i => (
                    <div className="Challenge Challenge_loading" key={i}>
                        <div className="Challenge__header">
                            <div className="Challenge__streamer">
                                <span className="Challenge__streamerAvatar loader"/>
                                <div className="Challenge__streamerLogin loader"/>
                            </div>
                            <div className="Challenge__crumb loader"/>
                        </div>
                        <div className="Challenge__cover">
                            <span className="Challenge__coverShadow"/>
                            <div className="Challenge__price loader"/>
                        </div>
                        <div className="Challenge__body">
                            <div className="Challenge__title loader"/>
                            <div className="Challenge__actions">
                                <div className="Challenge__inputContainer"/>
                                <div className="Challenge__button loader"/>
                            </div>
                        </div>
                        <div className="Challenge__description loader"/>
                    </div>
                ))}
            </div>
        </div>
    )

    getLoadingFooter = () => {
        if (this.state.isFirstLoading) return null
        else if (this.props.isChallengesNoMore) { // noinspection HtmlRequiredAltAttribute
            return (
                <div className="loader__finish loader__finish_absolute">
                    <span className="loader__finishCircle"/>
                    <img src={finishIcon}/>
                </div>
            )
        } else if (this.props.isChallengesLoading) return (
            <div className="ChallengeLoader">
                <div className="loader__pending">
                    <span className="loader__pendingDot"/>
                    <div className="loader__pendingDots"><span/><span/><span/></div>
                </div>
            </div>
        )
        else return null
    }

    render() {
        if (this.state.isFirstLoading && this.props.isChallengesLoading) return this.getFirstLoadingScreen()
        const challenges = this.getProperChallenges()
        return (
            <div className="OrdersFeed">
                <div className="OrdersFeed__body">
                    {challenges.map(challenge => (
                        <Challenge
                            key={challenge.id}
                            personal={this.props.personal}
                            challenge={challenge}
                            isWidgets={this.props.isWidgets}
                        />
                    ))}
                </div>
                {this.getLoadingFooter()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,

    challenges: state.challenges.challenges,
    searchTerm: state.challenges.searchTerm,
    filter: state.challenges.filter.key,

    activeStreamer: state.activeStreamer.activeStreamer,
    activeStreamerChallenges: state.challenges.activeStreamerChallenges,
    activeStreamerSearchTerm: state.challenges.activeStreamerSearchTerm,
    activeStreamerFilter: state.challenges.activeStreamerFilter.key,

    isFiltersUpdated: state.challenges.filtersUpdated,
    isChallengesLoading: state.challenges.loading,
    isChallengesLoaded: state.challenges.loaded,
    isChallengesNoMore: state.challenges.noMore
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetChallenges: (filter, searchTerm) => dispatch(getChallenges(filter, searchTerm)),
        handleGetMoreChallenges: (from, filter, searchTerm) => dispatch(getMoreChallenges(from, filter, searchTerm)),

        handleGetChallengesByUserId: (id, filter, searchTerm) => dispatch(getChallengesByUserId(id, filter, searchTerm)),
        handleGetMoreChallengesByUserId: (id, from, filter, searchTerm) => dispatch(getMoreChallengesByUserId(id, from, filter, searchTerm))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesFeed);
