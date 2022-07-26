import React, { Component } from 'react';

import { readNotifications } from 'Fetchers/index'

class Notifications extends Component {

    componentDidMount(){
        document.addEventListener('click', this.hideNotifications)
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.hideNotifications)
    }

    hideNotifications = event => {
        const characterNode = document.querySelector('.Character')
        const notificationNode = document.querySelector('.Notifications')

        if (!notificationNode || !notificationNode.contains(event.target) || !characterNode || !characterNode.contains(event.target)) {
            this.props.handleClickOutside()
        }
    }

    render() {
        const notifications = this.props.notifications
        if(!!notifications && notifications.length > 0){
            this.readNotifications();
            return (
                <div className="Notifications">
                    <h6 className="Notifications__title">Уведомления</h6>
                    <div className="Notifications__feed">
                        {notifications.slice(0,7).map(item => (
                            <div key={item.id} className="Notifications__item">
                                <p className="Notifications__itemText">{item.text}</p>
                                <p className="Notifications__itemDate">{item.date}</p>
                            </div>
                        ))}
                    </div>
                    <span className="Notifications__footer"/>
                </div>
            )
        } else {
            return (
                <div className="Notifications">
                    <h6 className="Notifications__title">Уведомления</h6>
                    <p className="Notifications__disclaimer">
                        Это колокольчик.<br/><br/>
                        Создали челлендж, повысили ставку или приняли челлендж – он звенит!<br/>
                        <span>Такие дела <span className='Notifications__emoji'>🌝</span></span>
                    </p>
                </div>
            )
        }
    }

    readNotifications() {
        const idsToRead = this.props.notifications.filter(item => !item.read).map(item => item.id);
        if (idsToRead.length > 0)
            readNotifications(idsToRead);
    }
}

export default Notifications