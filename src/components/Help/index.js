import {
    getChallenges, resetFilters,
    setChallengesSearchTerm
} from "Actions/challenges";
import { postComplain } from "Fetchers/index";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import log from '../../utils/logging';

let timer = null

class Help extends Component {

    constructor(props) {
        super(props)
        this.state = {
            challenge: undefined,
            description: '',
            isErrors: [],
            isHelpFocused: false,
            isHelpSubmitted: false,
            searchTerm: props.searchTerm
        }
    }

    componentDidMount(){
        const { searchTerm, handleGetChallenges, handleSetChallengesSearchTerm } = this.props
        handleSetChallengesSearchTerm('')
        handleGetChallenges(searchTerm)

        document.addEventListener('click', this.handleClickOutside, true)
    }

    componentDidUpdate(){
        const { isFiltersUpdated, searchTerm, handleGetChallenges } = this.props
        if(isFiltersUpdated) handleGetChallenges(searchTerm)
    }

    componentWillUnmount(){
        this.props.handleResetFilters()
    }

    getBody = () => {
        return (
            <div className="Help__body">
                {this.getChallengeInput()}
                <div className="CreateChallenge__row CreateChallenge__row_description">
                    <span className="CreateChallenge__label">Сообщение*</span>
                    <textarea
                        rows='5'
                        name='description'
                        className={`
                                CreateChallenge__input ${this.state.isErrors.includes('description') && 'CreateChallenge__input_error'}`}
                        value={this.props.templateDescription ? this.props.templateDescription : this.props.description}
                        onChange={this.handleDescriptionChange}
                    />
                    {this.state.isErrors.includes('description') &&
                    <p className="CreateChallenge__input_errorMessage">Расскажите, что случилось?</p>}
                </div>
                <button
                    className="Button Button_purple Popup__submit"
                    onClick={this.handleComplainSubmit}
                >Отправить
                </button>
            </div>
        )
    }

    getChallengeInput = () => {
        if (this.state.challenge && this.state.challenge.id) {
            const { title, streamerPhotoLink, streamerLogin } = this.state.challenge
            return (
                <div className="CreateChallenge__row">
                    <span className="CreateChallenge__label">Челлендж</span>
                    <span
                        className="Help__item Help__item_active"
                        onClick={this.handleUnsetChallenge}
                    >
                        <p className="Help__challengeTitle">{title}</p>
                        <div className="Help__row">
                            <img
                                src={streamerPhotoLink}
                                className="Help__avatar"/>
                            <p className='Help__streamer'>{streamerLogin}</p>
                        </div>
                    </span>
                </div>
            )
        } else {
            return (
                <div className="CreateChallenge__row">
                    <span className="CreateChallenge__label">Челлендж</span>
                    <input
                        autoComplete="off"
                        name='challenge'
                        type='text'
                        className={`Help__input CreateChallenge__input`}
                        value={this.state.searchTerm}
                        onChange={this.handleChallengeChange}
                        onFocus={() => this.setState({
                            isHelpFocused: true,
                            isErrors: this.state.isErrors.filter(el => el !== 'challenge')
                        })}
                    />
                    <ul className={`Help__list ${(this.state.isHelpFocused && this.props.challenges.length > 0) && 'Help__list_active'}`}>
                        {this.props.challenges.slice(0, 5).map(challenge => (
                            <li
                                key={challenge.id}
                                className="Help__item"
                                onClick={() => this.handleSetChallenge(challenge)}
                            >
                                <p className="Help__challengeTitle">{challenge.title}</p>
                                <div className="Help__row">
                                    <img
                                        src={challenge.streamerPhotoLink}
                                        className="Help__avatar"/>
                                    <p className='Help__streamer'>{challenge.streamerLogin}</p>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            )
        }
    }

    handleClickOutside = event => {
        const challengeInput = document.querySelector('input.Help__input')

        if (!challengeInput || !challengeInput.contains(event.target)) {
            this.setState({ isHelpFocused: false });
        }
    }

    handleChallengeChange = e => {
        clearTimeout(timer)
        const searchTerm  = e.target.value

        this.setState({ searchTerm })

        timer = setTimeout(() => {
            this.props.handleSetChallengesSearchTerm(searchTerm)
        }, 250)
    }

    handleSetChallenge = challenge => {
        this.setState({challenge})
    }

    handleUnsetChallenge = () => {
        this.setState({ challenge: null })

    }

    handleDescriptionChange = e => {
        this.setState({
            description: e.target.value,
            isErrors: this.state.isErrors.filter(el => el !== e.target.name)
        })
    }

    handleComplainSubmit = () => {
        const {challenge, description} = this.state
        let isErrors = []
        if (!description) isErrors.push('description')

        if (isErrors.length !== 0) {
            log.error('', isErrors)
            this.setState({isErrors})
        }
        else {
            let body = { complainText: description }
            if(!!challenge && !!challenge.id) body = { ...body, challengeId: challenge.id }

            postComplain(body).then(res => {
                this.setState({
                    streamer: undefined,
                    challenge: undefined,
                    description: '',
                    isErrors: [],
                    isHelpSubmitted: true
                })
            })
        }
    }

    render() {
        return (
            <div className='Help'>
                {this.state.isHelpSubmitted ?
                    (<p className="Help__text Help__text_single">
                        Благодарим за репорт!<br/>
                        Ушли разбираться с проблемой.
                    </p>) :
                    (<p className="Help__text">
                        Если ваш челлендж не был выполнен или вы хотите поделиться с нами чем-то ещё – эта форма к вашим услугам
                    </p>)
                }
                {!this.state.isHelpSubmitted && this.getBody()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    challenges: state.challenges.challenges,
    isChallengesLoading: state.challenges.loading,
    searchTerm: state.challenges.searchTerm,
    isFiltersUpdated: state.challenges.filtersUpdated,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetChallenges: searchTerm => dispatch(getChallenges(null, searchTerm)),
        handleSetChallengesSearchTerm: searchTerm => dispatch(setChallengesSearchTerm(searchTerm)),
        handleResetFilters: () => dispatch(resetFilters())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
