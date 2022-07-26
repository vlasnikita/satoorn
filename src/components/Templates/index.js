import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setCreateChallengeDescription, setCreateChallengeType} from "Actions/createChallenge";
import pipe from 'Static/templates/templates-pipe.svg'

let lastHighlightedIndex = 0

class Templates extends Component {

    componentDidMount() {
        const templatesNodes = document.querySelectorAll('.Templates__template')

        setInterval(()=>{

            let indexToHighlight = Math.floor(Math.random() * templatesNodes.length - 1)
            indexToHighlight = indexToHighlight === lastHighlightedIndex ? Math.floor(Math.random() * templatesNodes.length - 1) : indexToHighlight

            const highlightedTemplate = templatesNodes[indexToHighlight]
            highlightedTemplate.className = 'Templates__template Templates__template_highlighted'

            lastHighlightedIndex = indexToHighlight
            setTimeout(() => highlightedTemplate.className = 'Templates__template',1100)

        }, 5000)
    }

    render() {
        return (
            <div className="Templates">
                <h3 className="Templates__header">Рекомендации</h3>
                <div className="Templates__feed">
                    {this.props.templates.map((template, i) => (
                        <div
                            key={i}
                            className="Templates__template"
                            onClick={() => this.props.handleSetCreateChallengeDescription(template.description)}
                        >
                            <p className="Templates__title">{template.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    templates: state.templates.templates
});

const mapDispatchToProps = (dispatch) => ({
    handleSetCreateChallengeDescription: description => dispatch(setCreateChallengeDescription(description)),
    handleSetCreateChallengeType: type => dispatch(setCreateChallengeType(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Templates);