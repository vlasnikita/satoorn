import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Route,Redirect } from "react-router-dom"

import TransactionsFeed from "Components/TransactionsFeed";
import OrdersFeed from "Components/OrdersFeed";
import StreamerContacts from "Components/StreamerContacts/";
import ChallengePage from "Components/ChallengePage/";
import CreateChallenge from "Components/CreateChallenge/";
import Widgets from "Components/Widgets/";
import FiltersBar from "Components/FiltersBar";

class UserRouter extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { username } = this.props.match.params

        return (
            <div className="User__body">
                <span className="User__bodyBlur"/>
                <Route path={`/${username}/transactions`} component={() => <TransactionsFeed documentTitle='Мои транзакции' />}/>
                <Route path={`/${username}/challenges/:challengeId`} component={() => <ChallengePage match={this.props.match} />}/>
                <Route exact path={`/${username}/challenges`} component={() => (
                    <Fragment>
                        <FiltersBar/>
                        <OrdersFeed isUser documentTitle={`${username}`} />
                    </Fragment>
                )}/>
                <Route path={`/${username}/widgets`} component={() => <Widgets match={this.props.match} documentTitle='Виджеты' />}/>
                <Route path={`/${username}/create`} component={() => <CreateChallenge documentTitle={`Создать челлендж ${username}`} /> }/>
                <Route path={`/${username}/channel`} component={() => <StreamerContacts activeStreamer={this.props.activeStreamer} documentTitle={`${username}`} />}/>
                <Route exact path={`/${username}`} component={() => <Redirect to={`/${username}/challenges`}/>}/>
            </div>
        )
    }

}

export default UserRouter;
