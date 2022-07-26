import React, { Component,Fragment } from 'react';
import {connect} from "react-redux";

import OrdersFeed from 'Components/OrdersFeed'
import Widget from './__widget'
import Sidebar from './__sidebar'

import {setActiveStreamerClientside} from "Actions/streamers";
import {resetWidgetChallenge} from 'Actions/widgetChallenge';
import {WIDGET_SETTINGS_DEFAULTS} from 'Constants/widgets'

import streamerIcon from 'Static/widgets/widgets-streamer.png'

let isDraggedOrSwitchedFormats = false

class Widgets extends Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            canvasWidgets: [],
            showChallengesFeed: false
        }
    }

    componentDidMount() {
        if(this.props.documentTitle) document.title = this.props.documentTitle

        const { activeStreamer } = this.props.activeStreamer
        if(!activeStreamer || !activeStreamer.id || activeStreamer.id !== this.props.profile.id) this.props.handleSetActiveStreamerClientside(this.props.profile)

        if(this.props.widgetChallenge) {
            this.emitNewWidget('challenge')
            this.props.handleResetWidgetChallenge()
        }
        document.querySelector('.Widgets__canvas').addEventListener('mousedown', this.handleCanvasClick, true)
    }

    componentDidUpdate(){
        if(this.props.widgetChallenge) {
            this.props.handleResetWidgetChallenge()
            this.emitNewWidget('challenge', {challenge: this.props.widgetChallenge})
        }
    }

    emitNewWidget = (type, payload = {}) => {
        const id = new Date().getTime()
        const size = WIDGET_SETTINGS_DEFAULTS[type].initialSize

        let newWidget = {
            id,
            type,
            size,
            postfix: null,
            isActive: true,
            position: {
                x: Math.round(this.canvas.current.offsetWidth / 2) - (size.width / 2),
                y: Math.round(this.canvas.current.offsetHeight / 2) - (size.height / 2)
            },
            settings: WIDGET_SETTINGS_DEFAULTS[type],
            ...payload
        }

        this.setState({
            selectedWidgetId: id,
            canvasWidgets: [
                ...this.state.canvasWidgets.map(item => item.isActive ? {...item, isActive: false} : item),
                newWidget
            ],
            showChallengesFeed: false
        })
    }

    getActiveWidget = () => {
        let active
        this.state.canvasWidgets.forEach(item => {
            if(item.isActive) active = item
        })
        return active
    }

    handleShowChallengesFeed = () => this.setState({ showChallengesFeed: true })

    handleSelectWidget = id => {
        if(id){
            const canvasWidgets = this.state.canvasWidgets.map(item => parseInt(item.id) === parseInt(id)
                ? {...item, isActive: true}
                : {...item, isActive: false}
            )
            this.setState({ canvasWidgets })
        }
        else {
            const canvasWidgets = this.state.canvasWidgets.map(item => ({...item, isActive: false}))
            this.setState({ canvasWidgets })
        }
    }

    handleSetInviteActiveFormat = newKey => {
        if(newKey !== this.state.inviteActiveFormatKey){
            this.setState({ inviteActiveFormatKey: newKey })
            isDraggedOrSwitchedFormats = true
        }
    }

    handleCanvasClick = e => {
        if(e.target.className === 'Widgets__widgetResize') return
        else if(e.target.className.includes('Widgets__widgetContainer')){
            const id = e.target.dataset.widgetid
            this.handleSelectWidget(id)
        }
        else this.handleSelectWidget(false)
    }

    handleUpdateWidgetProps = (id, newProps) => {
        console.log(id)
        console.log(newProps)
        const canvasWidgets = this.state.canvasWidgets.map(item => item.id === id
            ? {...item, ...newProps}
            : item
        )
        this.setState({ canvasWidgets })
    }

    handleDeleteWidget = id => {
        const canvasWidgets = this.state.canvasWidgets.filter(item => item.id !== id)
        this.setState({ canvasWidgets })
    }

    resetSidebar = () => {
        this.setState({ showChallengesFeed: false })
        this.handleSelectWidget()
    }

    renderOrdersFeed = () => {
        const { loading, loaded } = this.props.activeStreamer
        if(loading || !loaded) return null
        else return (
            <div className="Widgets__feed">
                <OrdersFeed isUser isWidgets />
            </div>
        )
    }

    renderCanvas = () => {
        return (
            <div
                className={`Widgets__canvas ${this.state.showChallengesFeed ? 'Widgets__canvas_hidden' : ''}`}
                ref={this.canvas}
            >
                {this.state.canvasWidgets.map(item => (
                    <Widget
                        activeStreamer={this.props.activeStreamer.activeStreamer}
                        key={item.id}
                        {...item}
                        updateProps={this.handleUpdateWidgetProps}
                        deleteWidget={this.handleDeleteWidget}
                    >{item.id} {item.type}</Widget>
                ))}
                <img src={streamerIcon} className="Widgets__canvasStreamer"/>
            </div>
        )
    }

    render() {
        return (
            <div className="Widgets">
                <Sidebar
                    activeWidget={this.getActiveWidget()}
                    activeStreamer={this.props.activeStreamer.activeStreamer}
                    showChallengesFeed={this.state.showChallengesFeed}
                    resetSidebar={this.resetSidebar}
                    getSettings={this.getSettings}
                    emitNewWidget={this.emitNewWidget}
                    handleUpdateWidgetProps={this.handleUpdateWidgetProps}
                    handleShowChallengesFeed={this.handleShowChallengesFeed}
                />
                {this.renderCanvas()}
                {this.state.showChallengesFeed && this.renderOrdersFeed()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeStreamer: state.activeStreamer,
    profile: state.profile.profile,
    widgetChallenge: state.widgetChallenge
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetActiveStreamerClientside: streamer => dispatch(setActiveStreamerClientside(streamer)),
        handleResetWidgetChallenge: () => dispatch(resetWidgetChallenge())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Widgets)
