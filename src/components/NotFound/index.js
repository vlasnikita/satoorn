import React, { Component } from 'react';

class NotFound extends Component {

    render() {
        return (
            <div className='NotFound'>
                <h2 className="NotFound__header NotFound__header_main">Такой урл нам пока не завезли 🤷‍♂️</h2>
                <br/>
                <br/>
                <h3 className="NotFound__header">Предлагаем передохнуть немного и вдохновиться идеями для будущих челленджей:</h3>
                <ul className="NotFound__list">
                    <li className="NotFound__item"><a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Как в Малайзии испытывают мальчиков в 16 лет</a></li>
                    <li className="NotFound__item"><a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Фанатка PewDiePie придумала в честь него танец</a></li>
                    <li className="NotFound__item"><a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">В Риге провели ТВ-викторину со стримерами</a></li>
                </ul>
            </div>
        );
    }
}

export default NotFound