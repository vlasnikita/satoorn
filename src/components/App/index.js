import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Cards from 'react-credit-cards';

import Layout from "Components/Layout";
import Header from "Components/Header";
import Main from "Components/Main";
import MainStreamers from "Components/Main/MainStreamers";
import User from "Components/User";
import About from "Components/About";
import Help from "Components/Help";
import NotFound from "Components/NotFound";
import HowItWorks from "Components/HowItWorks";
import Policy from "Components/Policy";
import Agreement from "Components/Agreement";
import AuthErrorPage from "Components/Error";
import store from 'Store/index';
import 'Utils/backgrounds'

class App extends Component {

    render() {
        
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Header/>
                        <Switch>
                            <Route path="/challenges" component={() => <Main/>}/>
                            <Route path="/streamers" component={() => <MainStreamers documentTitle='Стримеры' />}/>
                            <Route path="/credit" component={() =>
                                (
                                    <div id="PaymentForm">
                                        <Cards
                                            cvc={123}
                                            expiry={123}
                                            focused={true}
                                            name={'12323'}
                                            number={123}
                                        />
                                        <form>
                                            <input
                                                type="tel"
                                                name="number"
                                                placeholder="Card Number"
                                                onChange={console.log}
                                                onFocus={console.log}
                                            />
                                        </form>
                                    </div>
                                )
                            }/>

                            <Route path="/about" component={() => <About documentTitle='Документы' />}/>
                            <Route path="/policy" component={() => <Policy documentTitle='Политика обработки персональных данных' />}/>
                            <Route path="/confidential" component={() => <Policy documentTitle='Политика конфиденциальности' />}/>
                            <Route path="/agreement" component={() => <Agreement documentTitle='Пользовательское соглашение' />}/>
                            <Route path="/help" component={() => <Help documentTitle='Помощь' />}/>
                            <Route path="/terrorists-win" component={() => <NotFound documentTitle='Упс! Незавоз' />}/>
                            <Route path="/how-it-works" component={() => <HowItWorks documentTitle='О сервисе' />}/>
                            <Route path="/authError" component={() => <AuthErrorPage documentTitle='Ошибка авторизации' />}/>
                            <Route path="/" exact component={() => <Redirect to='/challenges'/>}/>
                            <Route path="/:username" component={routeProps => <User {...routeProps} />}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;