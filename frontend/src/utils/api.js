     class Api {
    constructor(baseUrl, autorization) {
      this._baseUrl = baseUrl;
      this._autorization = autorization;
    }
  
    getUserInformation() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._autorization
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
  
    changeAvatar (data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._autorization, 
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    changeUserInformation(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method:'PATCH',
        headers: {
          authorization: this._autorization,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });  
      
    } 
    
      getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._autorization
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    addCard(item) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._autorization,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });  
    }
  
    putLike(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._autorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method:'DELETE',
        headers: {
          authorization: this._autorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });  
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method:'DELETE',
        headers: {
          authorization: this._autorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

  }
  
const api = new Api(' https://mesto.nomoreparties.co/v1/cohort-19', 'aa46272a-30e5-4402-b74a-772ca1a3dacb');
export default api;
