import React, { Component } from 'react';
import {NavLink, withRouter } from "react-router-dom"

import { USER_ROUTES, MY_PAGE_ROUTES } from 'Constants/user_routes'

import arrowIcon from 'Static/user/user-arrow.svg'

let interval

class UserNavbar extends Component {

    constructor(props) {
        super(props);

        this.container = React.createRef();
        this.navbar = React.createRef();
        this.leftArrow = React.createRef();
        this.rightArrow = React.createRef();

        this.state = {
            translateX : 0,
            isLeftArrowVisible: true,
            isRightArrowVisible: true,
            navtabs: USER_ROUTES
        }
    }

    componentDidMount() {
        this.checkArrowVisibility()
    }

    componentDidUpdate() {

    }

    checkArrowVisibility = () => {
        const widthDifference = +this.container.current.offsetWidth - +this.navbar.current.offsetWidth
        const isRightArrowVisible = widthDifference < 0 && this.state.translateX > widthDifference
        const isLeftArrowVisible = this.state.translateX < 0

        if(isLeftArrowVisible)this.leftArrow.current.className = 'User__navbarArrow'
        else if(!isLeftArrowVisible) this.leftArrow.current.className = 'User__navbarArrow User__navbarArrow_hidden'

        if(isRightArrowVisible) this.rightArrow.current.className = 'User__navbarArrow User__navbarArrow_right'
        else if(!isRightArrowVisible) this.rightArrow.current.className = 'User__navbarArrow User__navbarArrow_right User__navbarArrow_hidden'
    }

    startTransformNavbar = isReverse => {
        // Если навбар влезает в контейнер
        if(+this.container.current.offsetWidth - +this.navbar.current.offsetWidth > 0) return

        else {
            interval = setInterval(() => {
                const widthDifference = +this.container.current.offsetWidth - +this.navbar.current.offsetWidth

                const translateX = this.state.translateX
                const step_x_px = 2
                let new_translate_x

                if(isReverse){
                    // Обратную логику см. в else-блоке
                    new_translate_x = translateX + step_x_px > 0
                        ? 0
                        : translateX + step_x_px
                }
                else {
                    // Проверяем отскролили ли уже на разность ширин контейнера и навбара
                    // Если да - останавливаемся принудительно на этой разности
                    // Если нет - продолжаем разговор
                    new_translate_x = translateX - step_x_px < widthDifference
                        ? widthDifference
                        : translateX - step_x_px
                }

                // translateX = new_translate_x
                // this.navbar.current.style.transform = `translateX(${translateX}px)`
                translateX !== new_translate_x && this.setState({ translateX: new_translate_x })
            }, 5)
        }
    }

    stopTransformNavbar = () => {
        this.checkArrowVisibility()
        clearInterval(interval)
    }

    getNavbarItems = () => {
        const _url = `/${this.props.match.params.username}`

        return this.state.navtabs
            .filter(item => this.props.isMyPage ? item : !item.isMyPageVisible)
            .map(item => {
                const isValidDepth = /\/(\d|\w)+\/(\d|\w)+/.test(this.props.location.pathname)
                const isValidRoute = this.props.location.pathname.split('/').pop() === item.route

                return (
                    <NavLink
                        key={item.route}
                        className="User__navbarItem"
                        isActive={() => isValidDepth && isValidRoute}
                        activeClassName="User__navbarItem_active"
                        to={`${_url}/${item.route}`}
                    >
                        {item.icon && <img className="User__navbarIcon" src={item.icon}/>}
                        {item.title}
                    </NavLink>
                )
            })
    }

    render() {
        return (
            <div className="User__navbarWrapper">
                <button
                    className={`User__navbarArrow ${this.state.isLeftArrowVisible ? '' : 'User__navbarArrow_hidden'}`}
                    ref={this.leftArrow}
                    onMouseDown={() => this.startTransformNavbar(true)}
                    onMouseUp={this.stopTransformNavbar}
                    onMouseUpCapture={this.stopTransformNavbar}
                >
                    <img src={arrowIcon}/>
                </button>
                <div className="User__navbarContainer" ref={this.container}>
                    <div className='User__navbar' ref={this.navbar} style={{ transform: `translateX(${this.state.translateX}px)`}}>
                        {this.getNavbarItems()}
                    </div>
                </div>
                <button
                    className={`User__navbarArrow User__navbarArrow_right ${this.state.isRightArrowVisible ? '' : 'User__navbarArrow_hidden'}`}
                    ref={this.rightArrow}
                    onMouseDown={() => this.startTransformNavbar(false)}
                    onMouseUp={this.stopTransformNavbar}
                    onMouseUpCapture={this.stopTransformNavbar}
                >
                    <img src={arrowIcon}/>
                </button>
            </div>
        );
    }
}

export default withRouter(UserNavbar)