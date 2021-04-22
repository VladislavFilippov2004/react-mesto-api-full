import React from 'react';
import iconSuccess from '../images/icon-success.png';
import iconFailed from '../images/icon-failed.svg';
import iconClose from '../images/icon-close.png';

function InfoTooltip(props) {
    return (
        <section className={`popup ${ props.isOpen ? 'popup_opened' : ''}`}>
            <div className='infotooltip' >
                <img src={props.isSuccess ? iconSuccess : iconFailed} className='infotooltip__result-icon' />
                <p className='infotooltip__result-text'>{props.isSuccess ? "Вы успешно зарегестрировались" : 'Что-то пошло не так! Попробуйте ещё раз'}</p>
                <button type='button' className='infotooltip__close-btn' onClick={props.onClose}>
                    <img src={iconClose} className='infotooltip__close-icon' />
                </button>
            </div>
        </section>
    )
}

export default InfoTooltip;