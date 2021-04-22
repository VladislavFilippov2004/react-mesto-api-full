
class Auth {
    constructor(base_Url) {
        this._base_Url = base_Url
    }
    
    register = (email, password) => {
        return fetch(`${this._base_Url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                password: password,
                email: email
              })
        })
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
    authorize = (email, password) => {
        return fetch(`${this._base_Url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email
              })
        })
        .then((res) => {
            console.log('Сработает auth.authorize.then')
            return res
        })
        .catch((err) => {
            console.log('Сработает auth.authorize.catch')
            return err
        })
    }
        checkToken(token) {
            return fetch(`${this._base_Url}/users/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
                .then((res) => {
                  return res})
                .catch((err) => console.log('Ошибка.', err))
        }
    

    
}
const auth = new Auth ('https://auth.nomoreparties.co');
export default auth;

 
 