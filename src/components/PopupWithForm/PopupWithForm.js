import React, {useEffect} from 'react';

function PopupWithForm({title, name, isOpen, onClose, children, buttonText}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose)
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [isOpen])

  function handleEscClose(evt){
    if (evt.key === 'Escape') {
      onClose();
    };
  };

  function mauseDawnClose(evt){
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    };
    if (evt.target.classList.contains('popup__close')) {
      onClose();
    };
  }

  return (
    <div className={`popup popup_animation popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form-admin" name={name} noValidate>
          {
            children
          }
          <input className="popup__button" type="submit" value={buttonText} />
        </form>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
