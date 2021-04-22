import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState()
    const [description, setDescription] = React.useState()
    
    function handleName(e) { // функция в которую поступают значения инпутов вследствие чего происходят изменения name 
        setName(e.target.value)
    }
    
    function handleDescription(e) { // функция в которую поступают значения инпутов вследствие чего происходят изменения description
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
          });
    }
    
    React.useEffect(() => {// хук, который задаёт значения полям с помощью контекста
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); // при изменении в currentUser будет происходить рендеринг

    return (
        <PopupWithForm onSubmit={handleSubmit} title='Редактировать профиль' name='user-info' buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose}>

            <fieldset className="popup__info">

                <input type="text" value={name || ""} onChange={handleName} className="popup__input popup__input_name" id="name-input" name="input-user-name" minLength="2" required />
                <span className='span-error name-input-error  popup__span-error'></span>
                <input type="text" value={description || ""} onChange={handleDescription} className="popup__input popup__input_job " id="job-input" name='input-user-job' minLength="2" required />
                <span className='span-error job-input-error popup__span-error'></span>

            </fieldset>
        </PopupWithForm>

    )
}
export default EditProfilePopup
