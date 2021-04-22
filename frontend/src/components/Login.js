import React from 'react';


function Login(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

   function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onLogin(email, password)
    }   

    return (
        
        <form className="reg-log__form" onSubmit={handleSubmit}>
            <h2 className="reg-log__title">Вход</h2>
            <input value={email || ''} onChange={onEmailChange} type="email" className="reg-log__input registration-page__input_email" id="email-input" placeholder="Email"></input>
            <input value={password || ''} onChange={onPasswordChange} type="password" className="reg-log__input registration-page__input_password" id="password-input" placeholder="Пароль"></input>
            <button className='reg-log__button'>Войти</button>
        </form>
        
  
    )
}

export default Login;