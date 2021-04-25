import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const cardContext = React.useContext(CurrentUserContext); // переменная подписка к контексту
    const isOwn = props.card.owner === cardContext._id; // переменная, сравнивающая id владельца карточки и наш id для 
    // управление классами иконки мусорки
    const isLiked = props.card.likes.some(i => i === cardContext._id); // переменная, сравинивающая id владельца карточки и 
    // наш id для управления иконкой лайка (происходит в массиве likes)
    const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_black' : 'elements__like_white'}` // переменная определяющая состояние лайка

    function handleClick() {
        props.onCardClick(props.card);
    } // функция "прокидывающая карточку в компонент main"

    function handleLikeClick() {
        props.onCardLike(props.card)
    } // функция "прокидывающая карточку в компонент main"

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }


    return (
        // <template className='elements elements__template' id='item-template'>
            <div className="elements__item">
                <img className="elements__image" src={props.card.link} alt={`Увеличенная в размере картинка ${props.card.name}`}  onClick={handleClick} />
                <div className="elements__under-picture">
                    <h4 className="elements__text">{props.card.name}</h4>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
                        <div className="elements__like-counter">{props.card.likes.length}</div>
                    </button>
                    <button className={`${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`} onClick={handleDeleteClick} type="button"></button>
                </div>
            </div>
        // </template>
    )
}
export default Card;
