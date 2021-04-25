import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto" />
            <nav>

                <Switch>
                    <Route path="/signup">
                        <NavLink className="header__link" to="/signin">Войти</NavLink>
                    </Route>
                    <Route path="/signin">
                        <NavLink className="header__link" to="/signup">Регистрация</NavLink>
                    </Route>
                    <Route exact path="/">
                        {props.isLogged ?
                            <div className="header__texts">
                                <p className='header__email'> {props.email} </p>
                                <NavLink onClick={props.signOut} className="header__link" to="/signup">Выйти</NavLink>
                            </div> : ''}
                    </Route>
                </Switch>

            </nav>

            {/* <button className="header__button">Определим текст через пропс</button> */}
        </header>
    )
}

export default Header;