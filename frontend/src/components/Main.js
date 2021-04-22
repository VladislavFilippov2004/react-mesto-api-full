import React, { useEffect } from 'react';
import pen from '../images/pen.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import editButton from '../images/button-edit.svg';
import addButton from '../images/add-button.svg';
import api from '../utils/api.js';
import Card from './Card.js';


function Main(props) { 
    const mainContext = React.useContext(CurrentUserContext); // подписка на контекст

    return (
        <main>
            <div className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${mainContext.avatar})` }} onClick={props.onEditAvatar}>
                    <div className='profile__box'>
                        <img className="profile__pen" src={pen} alt='pen'/>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__text">
                        <div className="profile__top-line">
                            <h1 className="profile__name">{mainContext.name}</h1>
                            <button className="profile__edit-button" type="button">
                                <img src={editButton} onClick={props.onEditProfile} alt="Кнопка редактирования" />
                            </button>
                        </div>
                        <p className="profile__job">{mainContext.about}</p>
                    </div>
                </div>
                <button className="profile__button-add" type="button" onClick={props.onAddPlace}>
                    <img src={addButton} className="profile__button-add-image" alt="Кнопка Добавить" />
                </button>
            </div> 
        
        <section className='elements'>
        {props.cards.map((item) => (<Card 
        key={item._id}
        card={item}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
        onCardClick={props.onCardClick}/>))}
        
        </section>
        </main>
    )
}


export default Main;