import React, { Component } from 'react';

class AuthErrorPage extends Component {

    render() {
        return (
            <div className="AuthErrorPage">
                <h1 className="NotFound__header NotFound__header_main">Что-то пошло не так во время авторизации :(</h1>
                <h2 className="NotFound__header">
                    Нам не удалось получить данные твоего аккаунта. 
                    Попробуй авторизоваться через другую платформу  или повтори попытку позже.
                    </h2>
                   
            </div>
        )
    }


}

export default AuthErrorPage;