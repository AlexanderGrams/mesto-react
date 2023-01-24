import React, { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js"
import { useForm } from "../../hooks/useForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const {values, inputValidity, inputValidationMessage, setValues, handleChange, resetAllForms} = useForm({});

  const currentUserData = useContext(CurrentUserContext);

  useEffect(() => {
    if(Object.keys(currentUserData).length !== 0){
      setValues({...values, 'nameUser': currentUserData.name, 'activity': currentUserData.about})
    }
  }, [currentUserData, isOpen]);

  function handleSubmit(e, setButtonLoading) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      nameUser: values.nameUser,
      activity: values.activity,
      resetAllForms: resetAllForms,
    }, setButtonLoading);
  }

  const isSubmitDisabled = inputValidity.nameUser && inputValidity.activity ? false : true;

  return (
    <PopupWithForm resetForm={resetAllForms} isSubmitDisabled={isSubmitDisabled} name={'edit-profile'} onSubmit={handleSubmit} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input id="name-input" className="popup__item popup__item_type_name" type="text" name="nameUser" required minLength="2" maxLength="40" placeholder="Введите имя" value={values.nameUser || ''} onChange={handleChange} />
        <span id="name-input-error" className="popup__text-error">{inputValidationMessage.nameUser}</span>
        <input id="name-activity" className="popup__item popup__item_type_activity" type="text" name="activity" required minLength="2" maxLength="200" placeholder="Введите хобби" value={values.activity || ''} onChange={handleChange} />
        <span id="name-activity-error" className="popup__text-error">{inputValidationMessage.activity}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
