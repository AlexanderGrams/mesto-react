import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddCrad}) {
  const [nameCard, setNameCard] = useState('');
  const [linkCard, setLinkCard] = useState('');


  function handleAddPlaceSubmit(e, setButtonLoading){
    e.preventDefault();
    onAddCrad({
      name: nameCard,
      link: linkCard,
    },
    setButtonLoading
    );
  }

  function handleChange(e, state){
    state(e.target.value)
  }

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} name={'add-card'} title={'Новое место'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input id="title-input" className="popup__item popup__item_type_title" type="text" name="name" required minLength="2" maxLength="30" placeholder="Название" onChange={(e)=> {handleChange(e, setNameCard)}} />
        <span id="title-input-error" className="popup__text-error"></span>
        <input id="link-input" className="popup__item popup__item_type_link" type="url" name="link" required placeholder="Ссылка на картинку" onChange={(e)=> {handleChange(e, setLinkCard)}} />
        <span id="link-input-error" className="popup__text-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
