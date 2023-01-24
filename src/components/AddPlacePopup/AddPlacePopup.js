import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useForm } from "../../hooks/useForm";

function AddPlacePopup({isOpen, onClose, onAddCrad}) {
  const {values, inputValidity, inputValidationMessage, handleChange, resetAllForms} = useForm({});

  function handleAddPlaceSubmit(e, setButtonLoading){
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCrad({
      values: values,
      resetAllForms: resetAllForms,
    },
    setButtonLoading
    );
  }

  const isSubmitDisabled = inputValidity.cardDescription && inputValidity.linkImg ? false : true;

  return (
    <PopupWithForm resetForm={resetAllForms} isSubmitDisabled={isSubmitDisabled} onSubmit={handleAddPlaceSubmit} name={'add-card'} title={'Новое место'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input value={values.cardDescription || ''} id="title-input" className="popup__item popup__item_type_title" type="text" name="cardDescription" required minLength="2" maxLength="30" placeholder="Название" onChange={handleChange} />
        <span id="title-input-error" className="popup__text-error">{inputValidationMessage.cardDescription}</span>
        <input value={values.linkImg || ''} id="link-input" className="popup__item popup__item_type_link" type="url" name="linkImg" required placeholder="Ссылка на картинку" onChange={handleChange} />
        <span id="link-input-error" className="popup__text-error">{inputValidationMessage.linkImg}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
