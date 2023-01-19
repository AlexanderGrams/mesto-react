import React, {useEffect, useState} from 'react';
import imgLoading from "../../images/loading-btn.gif";

function PopupWithForm({title, name, isOpen, onClose, children, buttonText, onSubmit}) {
  const [buttonLoading, setButtonLoading] = useState(false);

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
    }
  };

  function mauseDawnClose(evt){
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    };
    if (evt.target.classList.contains('popup__close')) {
      onClose();
    };
  }

  function handlerOnSubmit(e){
    onSubmit(e, setButtonLoading);
    setButtonLoading(true)
  }

  return (
    <div className={`popup popup_animation popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form-admin" name={name} noValidate onSubmit={handlerOnSubmit}>
          {
            children
          }
          {buttonLoading ?
            <div className='loading-btn'>
              <img className='loading-btn__img' src={imgLoading} alt='анимация загрузки' />
            </div>
            :
            <input className="popup__button" type="submit" value={buttonText} />
          }
        </form>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
