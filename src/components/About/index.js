import React, { Component } from 'react';
import {Link} from "react-router-dom";

class About extends Component {

    render() {
        return (
            <div className='About'>
                <h2 className="About__header">Документы</h2>
                <Link
                    target="_blank"
                    to='/policy'
                    className="About__link"
                >Политика обработки персональных данных</Link>
                <Link
                    target="_blank"
                    to='/agreement'
                    className="About__link"
                >Пользовательское соглашение</Link>
                <Link
                    target="_blank"
                    to='/confidential'
                    className="About__link"
                >Политика конфиденциальности</Link>
            </div>
        );
    }
}

export default About