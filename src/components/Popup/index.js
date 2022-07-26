import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openPopup, closePopup } from "Actions/popup";
import POPUP_TYPE from 'Constants/popup_type'
import AcceptDisclaimer from "./__acceptDisclaimer";
import DonateDisclaimer from "./__donateDisclaimer";
import AcceptChallenge from "./__acceptChallenge";
import Unregistred from "./__unregistred";
import PaymentMethods from "./__paymentMethods";
import PaymentCrypto from "./__paymentCrypto";

class Popup extends Component {

    getBody = () => {
        const { popup, handleClosePopup, handleOpenPopup } = this.props
        switch (popup.type) {
            case(POPUP_TYPE.ACCEPT_DISCLAIMER):
                return (
                    <AcceptDisclaimer
                        handleOpen={handleOpenPopup}
                        handleClose={handleClosePopup}
                    />
                )
            case(POPUP_TYPE.DONATE_DISCLAIMER):
                return (
                    <DonateDisclaimer handleClose={handleClosePopup}/>
                )
            case(POPUP_TYPE.ACCEPT_CHALLENGE):
                return (
                    <AcceptChallenge
                        handleClose={handleClosePopup}
                        acceptingChallenge={popup.acceptingChallenge}
                    />
                )
            case(POPUP_TYPE.UNREGISTRED):
                return (
                    <Unregistred handleClose={handleClosePopup} />
                )
            case(POPUP_TYPE.PAYMENT_METHODS):
                return (
                    <PaymentMethods handleClose={handleClosePopup} />
                )
            case(POPUP_TYPE.PAYMENT_CRYPTO):
                return (
                    <PaymentCrypto handleClose={handleClosePopup} />
                )
        }
    }

    render() {
        return (
            <div className="Popup">
                <div className="Popup__body">
                    <button onClick={this.props.handleClosePopup} className="Popup__close">&#x2715;</button>
                    {this.getBody()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    popup: state.popup
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleClosePopup: () => dispatch(closePopup()),
        handleOpenPopup: (type, acceptingChallenge) => dispatch(openPopup(type, acceptingChallenge))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);