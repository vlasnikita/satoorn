import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { toggleCommonOnboarding } from 'Fetchers/index'
import { logUserAction } from "Utils/metrics";
import { getSettings } from "Actions/configs";

import arrowIcon from 'Static/arrow.svg'
import slide1 from 'Static/howitworks/howitworks-1.png'
import slide2 from 'Static/howitworks/howitworks-2.png'
import slide3 from 'Static/howitworks/howitworks-3.png'
import slide4 from 'Static/howitworks/howitworks-4.png'
import slide5 from 'Static/howitworks/howitworks-5.png'
import slide6 from 'Static/howitworks/howitworks-6.png'
import pdf from 'Static/how-it-works.pdf'
import fileIcon from 'Static/howitworks/howitworks-icon.svg'

const slideMap = {
    1: slide1,
    2: slide2,
    3: slide3,
    4: slide4,
    5: slide5,
    6: slide6
};

class HowItWorks extends Component {

    state = {
        currentSlide: 1,
        isGoToChallenges: false
    };

    componentDidMount() {
        document.addEventListener('keydown', this.navigateByArrow);

        this.acceptOnboarding()
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.navigateByArrow);
    }

    getProfileData() {
        return this.props.profile.profile;
    }

    acceptOnboarding = () => {
        localStorage.setItem('__SATOORN__clientOnboardingConfirmed', 'true');
        logUserAction('ONBOARDING', 'CONFIRMED', this.getProfileData().id);
        if (!!this.getProfileData().id) {
            toggleCommonOnboarding()
                .then(() => {
                    localStorage.removeItem('__SATOORN__clientOnboardingConfirmed');
                    this.props.handleGetSettings()
                })
        }
        else {
            this.forceUpdate()
        }
    };

    navigateByArrow = e => {
        const key = e.key;

        if (key == 'ArrowLeft' && this.state.currentSlide > 1) this.setPrevSlide();
        else if (key == 'ArrowRight' && this.state.currentSlide < 6) this.setNextSlide()
    }

    getSlide = () => {
        return (
            <img
                src={slideMap[this.state.currentSlide]}
                className="HowItWorks__slide"
            />
        )
    };

    getCrumbs = () => {
        return (
            <div className="HowItWorks__crumbs">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <span key={i} className={`HowItWorks__crumb ${this.state.currentSlide == i ? 'HowItWorks__crumb_active' : ''}`}/>
                ))}
            </div>
        )
    };

    setNextSlide = () => {
        if (this.state.currentSlide < 6) this.setState({ currentSlide: this.state.currentSlide + 1 });
        else this.setState({ isGoToChallenges: true })
    };

    setPrevSlide = () => this.setState({ currentSlide: this.state.currentSlide - 1 });

    render() {
        if (this.state.isGoToChallenges) return <Redirect to={`/challenges`} />;
        else return (
            <div className='HowItWorks'>
                <a
                    target="_blank"
                    href={pdf}
                    className="HowItWorks__pdf"
                >
                    <img src={fileIcon}/>
                    <p>Открыть PDF</p>
                </a>
                <div className="HowItWorks__slider">
                    {this.getSlide()}
                    <div className="HowItWorks__navigation">
                        {this.getCrumbs()}
                        <div className="HowItWorks__buttons">
                            {this.state.currentSlide > 1 && this.state.currentSlide < 6 &&
                            <button
                                onClick={this.setPrevSlide}
                                className="Button Button_white HowItWorks__prev"
                            >
                                <img src={arrowIcon} />
                            </button>
                            }
                            <button
                                onClick={this.setNextSlide}
                                className="Button Button_purple HowItWorks__next"
                            >{this.state.currentSlide == 6 ? 'К топ-челленджам' : 'Далее'}</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    settings: state.configs.settings
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetSettings: () => dispatch(getSettings())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HowItWorks))