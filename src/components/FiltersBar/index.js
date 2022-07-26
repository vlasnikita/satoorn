import React, { Component } from 'react';
import {connect} from "react-redux";

import {
    setChallengesFilter, setChallengesSearchTerm,
    setChallengesByUserIdSearchTerm, setChallengesByUserIdFilter,
    resetFilters
} from "Actions/challenges";
import { getStreamers, setStreamersSearchTerm } from "Actions/streamers";
import { CHALLENGE_FILTERS } from 'Constants/filters'

import iconLens from 'Static/lens.svg'
import filterIcon from 'Static/filter.svg'

let timer = null

class FiltersBar extends Component {

    constructor(props) {
        super(props)
        this.domNode = React.createRef();
        this.state = {
            searchTerm: '',
            isFilterTogglerActive: false
        }
    }

    componentWillUnmount(){
        this.props.handleResetFilters()
    }

    getBars = () => {
        const {
            filter, searchTerm,
            activeStreamer, activeStreamerFilter, activeStreamerSearchTerm
        } = this.props

        const filterNames = CHALLENGE_FILTERS
        const activeKey = activeStreamer.id ? activeStreamerFilter : filter
        return filterNames.map((filter, i) => (
            <div
                key={i}
                id={`FiltersBar__item_${i}`}
                className={`FiltersBar__item ${filter.key === activeKey && 'FiltersBar__item_active'}`}
                onClick={() => this.handleFilterChange(filter)}
            >{filter.value}</div>
        ))
    }

    getPlaceholder = () => {
        let placeholder
        if(this.props.isStreamer) placeholder = 'Поиск по нику'
        else placeholder = 'Поиск челленджа'

        return placeholder
    }

    handleFilterChange = filter => {
        // Фильтрация:
        // – челленджей стримера
        if(this.props.activeStreamer.id) this.props.handleSetChallengesByUserIdFilter(filter)
        // – всех челленджей на главной
        else this.props.handleSetChallengesFilter(filter)
    }

    handleSearchTermChange = e => {
        clearTimeout(timer)
        const searchTerm  = e.target.value

        this.setState({ searchTerm })

        if(this.props.isStreamer) {
            timer = setTimeout(() => {
                this.props.handleSetStreamersSearchTerm(searchTerm)
            }, 250)
        }
        else {
            timer = setTimeout(() => {
                if(this.props.activeStreamer.id) this.props.handleSetChallengesByUserIdSearchTerm(searchTerm)
                else this.props.handleSetChallengesSearchTerm(searchTerm)
            }, 250)
        }
    }

    render() {
        if(this.props.isWidgets) return (<div className='FiltersBar' ref={this.domNode}><WidgetsBar {...this.props} /></div>)
        else return (
            <div className='Container FiltersBar' ref={this.domNode}>
                <div className={`Container__body FiltersBar__body ${this.state.isFilterTogglerActive ? 'FiltersBar__body_toggled' : ''}`}>
                    <button
                        className={`FiltersBar__block FiltersBar__block_toggler FiltersBar__block_toggler_search`}
                        onClick={()=>this.setState({ isFilterTogglerActive: false })}
                    >
                        <div className="FiltersBar__searchButton">
                            <img src={iconLens} width={16}/>
                        </div>
                    </button>
                    <div className="FiltersBar__search">
                        <input
                            type="text"
                            className="FiltersBar__searchInput"
                            placeholder={this.getPlaceholder()}
                            value={this.state.searchTerm}
                            onChange={this.handleSearchTermChange}
                        />
                        <div className="FiltersBar__searchButton">
                            <img src={iconLens} alt="Поиск" width={16}/>
                        </div>
                    </div>

                    <button
                        className={`FiltersBar__block FiltersBar__block_toggler FiltersBar__block_toggler_filter`}
                        onClick={()=>this.setState({ isFilterTogglerActive: true })}
                    >
                        <div className="FiltersBar__searchButton">
                            <img src={filterIcon} width={16}/>
                        </div>
                    </button>
                    {!this.props.isStreamer && <div className="FiltersBar__block FiltersBar__block_bars">
                        {this.getBars()}
                    </div>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    profile: state.profile.profile,

    filter: state.challenges.filter.key,
    searchTerm: state.challenges.searchTerm,

    activeStreamer: state.activeStreamer.activeStreamer,
    activeStreamerSearchTerm: state.challenges.activeStreamerSearchTerm,
    activeStreamerFilter: state.challenges.activeStreamerFilter.key,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetChallengesFilter: filter => dispatch(setChallengesFilter(filter)),
        handleSetChallengesByUserIdFilter: filter => dispatch(setChallengesByUserIdFilter(filter)),
        handleSetChallengesSearchTerm: searchTerm => dispatch(setChallengesSearchTerm(searchTerm)),
        handleSetChallengesByUserIdSearchTerm: searchTerm => dispatch(setChallengesByUserIdSearchTerm(searchTerm)),

        handleSetStreamersSearchTerm: searchTerm => dispatch(setStreamersSearchTerm(searchTerm)),
        handleGetStreamers: searchTerm => dispatch(getStreamers(searchTerm)),

        handleResetFilters: () => dispatch(resetFilters())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
export const FiltersBarPure = FiltersBar