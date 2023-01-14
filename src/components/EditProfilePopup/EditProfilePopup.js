import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js"

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [nameUser, setNameUser] = useState('');
  const [description, setDescription] = useState('');

  const currentUserData = useContext(CurrentUserContext);

  useEffect(() => {
    if(Object.keys(currentUserData).length !== 0){
      setNameUser(currentUserData.name);
      setDescription(currentUserData.about);
    }
  }, [currentUserData]);

  function handleSubmit(e, setButtonLoading) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(nameUser, description, setButtonLoading);
  }

  function handleChange(e, state){
    state(e.target.value)
  }

  return (
    <PopupWithForm name={'edit-profile'} onSubmit={handleSubmit} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input id="name-input" className="popup__item popup__item_type_name" type="text" name="name" required minLength="2" maxLength="40" placeholder="Введите имя" value={nameUser} onChange={(e)=> {handleChange(e, setNameUser)}} />
        <span id="name-input-error" className="popup__text-error"></span>
        <input id="name-activity" className="popup__item popup__item_type_activity" type="text" name="activity" required minLength="2" maxLength="200" placeholder="Введите хобби" value={description} onChange={(e)=> {handleChange(e, setDescription)}} />
        <span id="name-activity-error" className="popup__text-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
