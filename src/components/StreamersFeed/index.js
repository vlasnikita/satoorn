import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import {getMoreStreamers, getStreamers} from "Actions/streamers"
import finishIcon from 'Static/finish.png'
import {logUserAction} from 'Utils/metrics';
import UserInfo from "Components/UserInfo/";

class StreamersFeed extends Component {

    state = {
        isFirstLoading: true
    };

    componentDidMount() {
        document.title = 'Стримеры'

        if (this.props.searchTerm.length > 1) this.props.handleGetStreamers(this.props.searchTerm);
        else this.props.handleGetStreamers();

        const div = document.querySelector('.StreamersFeed');
        if(!!div){
            // подгрузка данных при доскролливании до низа страницы
            div.addEventListener('scroll', this.handleScroll)
        }
    }

    componentWillUpdate() {
        if (this.state.isFirstLoading && this.props.isStreamersLoaded) this.setState({isFirstLoading: false})
    }

    componentDidUpdate() {
        if (this.props.isFiltersUpdated) {
            if (this.props.searchTerm.length > 1) this.props.handleGetStreamers(this.props.searchTerm);
            else this.props.handleGetStreamers()
        }
    }

    handleScroll = e => {
        const div = e.target
        if (!this.props.isStreamersNoMore && !this.props.isStreamersLoading && div.scrollTop + div.clientHeight > div.scrollHeight - 200) {
            if (this.props.searchTerm.length > 1) this.props.handleGetMoreStreamers(this.props.streamers.length + 1, this.props.searchTerm);
            else this.props.handleGetMoreStreamers(this.props.streamers.length + 1, this.props.searchTerm)
        }
    }

    getFirstLoadingScreen = () => (
        <div className="StreamersFeed">
            {'12345678'.split('').map(i => (
                <div className="Streamer Streamer_loading" key={i}>
                    <span className="Streamer__avatar loader"/>
                    <div className="Streamer__info">
                        <div className="Streamer__header loader">
                            <span className="Streamer__name"/>
                        </div>
                        <div className="Streamer__crumb loader"/>
                    </div>
                    <span className="Streamer__button loader"/>
                </div>
            ))}
        </div>
    );

    getLoadingFooter = () => {
        if (this.state.isFirstLoading) return null;
        else if (this.props.isStreamersNoMore) return (
            <Fragment>
                <span className="loader__finishBefore"/>
                <div className="loader__finish">
                    <span className="loader__finishCircle"/>
                    <img src={finishIcon} alt={"loading..."}/>
                </div>
            </Fragment>
        );
        else if (this.props.isStreamersLoading) return (
            <div className="loader__pending">
                <span className="loader__pendingDot"/>
                <div className="loader__pendingDots"><span/><span/><span/></div>
            </div>
        );
        else return null
    };

    render() {
        if (this.state.isFirstLoading && this.props.isStreamersLoading) return this.getFirstLoadingScreen();
        return (
            <div className="StreamersFeed">
                {Array.isArray(this.props.streamers) && this.props.streamers.map((streamer, i) => (
                    <Link
                        to={`/${streamer.login}`}
                        className="Streamer" key={i}
                    >
                        <UserInfo feed streamer={streamer}/>
                        <Link
                            id="Streamer__button"
                            onClick={() => this.logEventResolvingCurrentProfile()}
                            className="Button Button_wide"
                            to={`/${streamer.login}/`}
                        >Перейти в профиль
                        </Link>
                    </Link>
                ))}
                {this.getLoadingFooter()}
            </div>
        );
    }

    logEventResolvingCurrentProfile() {
        const userId = !!this.props.profile && !!this.props.profile.id ? this.props.profile.id : null;
      logUserAction('STREAMERS_FEED', 'CREATE_CHALLENGE', userId)
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    streamers: state.streamers.streamers,
    isStreamersLoading: state.streamers.loading,
    isStreamersLoaded: state.streamers.loaded,
    isStreamersNoMore: state.streamers.noMore,
    searchTerm: state.streamers.searchTerm,
    isFiltersUpdated: state.streamers.filtersUpdated,
});

const mapDispatchToProps = dispatch => {
    return {
        handleGetStreamers: searchTerm => dispatch(getStreamers(searchTerm)),
        handleGetMoreStreamers: (from, searchTerm) => dispatch(getMoreStreamers(from, searchTerm))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamersFeed);
