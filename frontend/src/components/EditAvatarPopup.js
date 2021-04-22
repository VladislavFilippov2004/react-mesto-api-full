import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        }
        )  
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="new-avatar" title="Обновить аватар" buttonText="Сохранить"  isOpen={props.isOpen} onClose={props.onClose}>
            <fieldset className="popup__info">
                <input ref={avatarRef} type="url" className="popup__input popup__input_link" id="link" name='link'
                    placeholder="Ссылка на картинку" required />
                <span className='span-error link-error popup__span-error'></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;