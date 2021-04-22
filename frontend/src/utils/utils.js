const elementTemplate = '.elements__template';

const popupAvatar = document.querySelector('.popup-new-avatar')
const formAvatar = document.querySelector('.popup__form_new-avatar');
const avatarDiv = document.querySelector('.profile__avatar');
const saveButton = document.querySelector('.popup__button-save');
const editButton = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup-user-info');
const popupPlaces = document.querySelector('.popup-new-place');
const formUserInfo = document.querySelector('.popup__form_user-info');
const formNewPlace = document.querySelector('.popup__form_new-place');
const nameOnSite = document.querySelector('.profile__name');
const jobOnSite = document.querySelector('.profile__job');
const plusButton = document.querySelector('.profile__button-add');
const element = document.querySelector('.elements');
const elementItem = document.querySelector('.elements__item');
const popupPhoto = document.querySelector('.popup_photo');
const popupConfirm = document.querySelector('.popup-confirm');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const deleteButton = document.querySelector('.elements__trash');

export {
    editButton, popupUserInfo, popupPlaces, popupConfirm, formUserInfo, formNewPlace, nameOnSite, jobOnSite, plusButton,
    element, popupPhoto, nameInput, jobInput, saveButton, avatarDiv, popupAvatar, formAvatar, elementItem, elementTemplate, deleteButton
};