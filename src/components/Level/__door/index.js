import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setFormVisibility } from 'Actions/authForm';
import 'Utils/morph'

let timer

class Door extends Component {

    handleEnter = () => {
        // clearTimeout(timer)
        this.props.handleSetFormVisibility(true)
        TweenLite.to(".mario__base", .5, {morphSVG: ".mario__run"});
        document.querySelector('.mario').className = 'mario mario_run'
        document.querySelector('.Level__door').className = 'Level__door Level__door_highlight'
        setTimeout(()=>{
            TweenLite.to(".mario__base", .25, {morphSVG: ".mario__idle"});
        }, 1700)
        // timer = setTimeout(this.showForm, 2500)
    }

    showForm = () => {
        document.querySelector('.mario').className = 'mario'
        document.querySelector('.Level__door').className = 'Level__door'
        this.props.handleSetFormVisibility(true)
    }

    render() {
        return (
            <div
                className="Level__door"
                onClick={this.handleEnter}
                // onMouseEnter={this.handleEnter}
                // onClick={()=>this.props.handleSetFormVisibility(true)}
            ></div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetFormVisibility: authForm => dispatch(setFormVisibility(authForm))
    }
}

export default connect(null, mapDispatchToProps)(Door)