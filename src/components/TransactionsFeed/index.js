import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from "moment";

import { getTransactions } from "Actions/transactions";
import transaction_statuses from "Constants/transaction_statuses";

class TransactionsFeed extends Component {

    componentDidMount() {
        if(this.props.documentTitle) document.title = this.props.documentTitle

        this.props.handleGetTransactions(this.props.profile.id)
    }

    render() {
        return (
            <div className="TransactionsFeed">
                {Array.isArray(this.props.transactions) && this.props.transactions.map((transaction, i) => (
                    <div className="Transaction" key={transaction.id}>
                        <div className="Transaction__body">
                            <h4 className="Transaction__title">{transaction.challengeName}</h4>
                            <div className="Transaction__info">
                                <div className="Transaction__amount">{transaction.amount}&nbsp;₽</div>
                                <div className="Transaction__crumbs">
                                    <div className="Transaction__crumb">
                                        <span className='Transaction__crumbLabel'>тип:</span>
                                            &nbsp;{transaction_statuses[transaction.transactionStatus].text}
                                    </div>
                                    <div className="Transaction__crumb">
                                        <span className='Transaction__crumbLabel'>обновлено:</span>&nbsp;{transaction.dateUpdated}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className="Transaction__status" src={transaction_statuses[transaction.transactionStatus].style} />
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    profile: state.profile.profile
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetTransactions: id => dispatch(getTransactions(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsFeed);