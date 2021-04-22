import closeIcon from '../images/close_icon.svg'

function ImagePopup(props) {
    
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_photo`}>
                <div className="popup__image-div">
                    <img className="popup__image" src={props.card ? props.card.link :  '#'} alt="Увеличенная в размере картинка" />
                    <p className="popup__text">{props.card ? props.card.name : 'Плохое соединение с интернетом'}</p>
                    <button className="popup__icon-close" type="reset" onClick={props.onClose}>
                        <img src={closeIcon} alt="Кнопка закрыть" />
                    </button>
                </div>
            </div>
    )
}
export default ImagePopup;