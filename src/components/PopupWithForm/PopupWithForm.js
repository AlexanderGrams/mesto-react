function PopupWithForm({title, name, isOpen, onClose, children}) {

  if(isOpen){
    document.addEventListener('keydown', handleEscClose);
  }

  function close(){
    onClose();
    document.removeEventListener('keydown', handleEscClose);
  };

  function handleEscClose(evt){
    if (evt.key === 'Escape') {
      close();
    };
  };

  function mauseDawnClose(evt){
    if (evt.target.classList.contains('popup_opened')) {
      close();
    };
    if (evt.target.classList.contains('popup__close')) {
      close();
    };
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form-admin" name={name} noValidate>
          {
            children
          }
        </form>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
