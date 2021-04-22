import React from 'react';

function Register(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password)
    }

    return (
            <form className="reg-log__form" onSubmit={handleSubmit}>
                <h2 className="reg-log__title">Регистрация</h2>
                <input value={email || ''} autoComplete="off" onChange={onEmailChange} type="email" className="reg-log__input registration-page__input_email" id="email-input" placeholder="Email"></input>
                <input value={password || ''} autoComplete="off" onChange={onPasswordChange} type="password" className="reg-log__input registration-page__input_password" id="password-input" placeholder="Пароль"></input>
                <button className='reg-log__button'>Зарегестрироваться</button>
                <a className="reg-log__text" href="/signin">Уже зарегестрированы? Войти</a>
            </form>
    )
}

export default Register;