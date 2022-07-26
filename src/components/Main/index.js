import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrdersFeed from "Components/OrdersFeed";
import FiltersBar from "Components/FiltersBar";

import { resetActiveStreamer } from "Actions/streamers";

class Main extends Component {

    componentDidMount() {

        this.props.handleResetActiveStreamer()
    }

    render() {
        return (
            <div className="Main">
                <FiltersBar />
                <OrdersFeed documentTitle='Челленджи' />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        handleResetActiveStreamer: () => dispatch(resetActiveStreamer())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
export const MainPure = Main