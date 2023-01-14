import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef()

  function handleSubmit(e, setButtonLoading) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    },
    setButtonLoading
    );
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name={'update-avatar'} title={'Обновить аватар'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input ref={inputRef} id="link-avatar-input" className="popup__item popup__item_type_link-avatar" type="url" name="link" required placeholder="Ссылка на картинку" />
        <span id="link-avatar-input-error" className="popup__text-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
