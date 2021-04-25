import React, { useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js'
import api from '../utils/api.js';
import auth from '../utils/auth.js'
import '../index.css';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ImagePopup from './ImagePopup.js'
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js'

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')

    React.useEffect(() => {
        api.getUserInformation()
            .then((userInfo) => {
                console.log('getUserInfo isLoggedIn', isLoggedIn);
                console.log('useEffect getUserInfo setCurrentUser userInfo', userInfo);
                setCurrentUser(userInfo)
            })

            .catch((err) => {
                console.log('Попало в catch(getUserInfo', err);
            })

        api.getInitialCards()
            .then((initialCards) => {
                console.log(initialCards)
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err)
            })

    }, [isLoggedIn])

    React.useEffect(() => {
        checkToken()

    }, [])

    function checkToken() {
        const token = localStorage.getItem('token')
        // console.log('token из localStorage', token)
        auth.checkToken(token)
            .then((res) => {
                if (res.status === 200) {
                    setLoggedIn(true)
                    history.push('/')
                    return res.json();
                } else {
                    setLoggedIn(false)
                }
            })
            .then((res) => {
                // console.log('checkToken.then2', res)
                if (res) {
                    setUserEmail(res.email)
                } else {
                    history.push('/signin')
                }
            })
    }

    function handleCardLike(card) { // функция постановки и снятия лайка
        const isLiked = card.likes.some(i => i === currentUser._id); // переменная, определяющая, есть ли наш id в массиве поставленных лайков
        console.log(isLiked)
        const likeRequest = !isLiked ? api.putLike(card._id) : api.deleteLike(card._id); // вызов запросов в api в соответствии с состоянием isLiked
        likeRequest.then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c) // находим карточку, которой поставили лайк и обновляем её
            setCards(newCards); // рендерим новый массив
        })
            .catch((err) => {
                console.log(err)
            });
    }

    const [isSuccess, setIsSuccess] = React.useState(false)

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                try {
                    if (res.status === 200) {
                        res.json()
                        setIsSuccess(true)
                        // console.log(isSuccess, 'должно быть true')
                        setInfoTooltipPopup(true);
                        history.push('/signin')
                    } else {
                        setIsSuccess(false)
                        // console.log(isSuccess, 'должно быть false')
                        setInfoTooltipPopup(true)
                    }
                } catch (err) {
                    setIsSuccess(false)
                    // console.log(isSuccess, 'должно быть false')
                    // console.log(isSuccess)
                    setInfoTooltipPopup(true)
                }

            })
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((res) => {
                // console.log('then1',res)
                try {
                    if (res.status === 200) {
                        return res.json()

                    } else {
                        // console.log('then1.1', res)
                        setIsSuccess(false)
                        setInfoTooltipPopup(true)
                        return res.json()
                    }
                } catch (err) {
                    console.log(err)
                    setIsSuccess(false)
                    setInfoTooltipPopup(true)
                }
            })
            .then((res) => {
                // console.log('handleLogin then2', res)
                localStorage.setItem('token', res.token);
                setLoggedIn(true);
                checkToken()
                // setUserEmail(res.data.email)
                history.push('/')
            })
            .catch((err) => console.log(err))
    }

    function handleSignOut() {
        console.log('handleSignOut');
        localStorage.removeItem('token');
        console.log('handleSignOut поставлю setLoggedIn false, текущий', isLoggedIn)
        setLoggedIn(false)
    }



    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((deletedCard) => { return deletedCard._id !== card._id })
                setCards(newCards)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    function handleEditProfileClick() {
        setEditProfilePopup(true)
    }

    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    function handleEditAvatarClick() {
        setEditAvatarPopup(true)
    }

    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false)
    function handleAddPlaceClick() {
        setAddPlacePopup(true)
    }

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isOpen, setIsOpen] = React.useState(false)
    function handleCardClick(card) {
        setIsOpen(true);
        setSelectedCard(card)
    }

    const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false)
    // function handleInfoTooltipPopup() {
    //     setInfoTooltipPopup(true)
    // }

    function handleUpdateUser(data) {
        api.changeUserInformation(data)
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                closeAllPopups()
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then((res) => {
                setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                closeAllPopups()
            })
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                closeAllPopups()
            })
    }

    function closeAllPopups() {
        setEditAvatarPopup(false)
        setEditProfilePopup(false)
        setAddPlacePopup(false)
        setIsOpen(false)
        setInfoTooltipPopup(false)
        setInfoTooltipPopup(false)
    }


    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="root">
                <Header email={userEmail} isLogged={isLoggedIn} signOut={handleSignOut}></Header>
                <Switch>
                    <Route path="/signin">
                        <Login onLogin={handleLogin}></Login>
                    </Route>

                    <Route path='/signup'>
                        <Register onRegister={handleRegister}></Register>
                    </Route>

                    <ProtectedRoute exact path="/" loggedIn={isLoggedIn} component={Main}
                        cards={cards}
                        setCards={setCards}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}>
                    </ProtectedRoute>


                    <Route path='*'>
                        {isLoggedIn ? <Redirect to='/' /> : <Redirect to="/signup" />}
                    </Route>

                </Switch>

                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess}></InfoTooltip>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}></AddPlacePopup>
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups} />
                <Footer></Footer>

            </div>

        </CurrentUserContext.Provider>

    );
}

export default App;