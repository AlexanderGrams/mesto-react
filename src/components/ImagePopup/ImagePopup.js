function ImagePopup({card, onClose}) {

  if(card){
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
    <div className={`popup popup_animation popup_type_zoom-img ${card ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container popup__container_type_zoom-img">
        <img className="popup__image" src={`${card.link}`} alt={`изображение: ${card._title}`} />
        <h2 className="popup__signature">{card.name}</h2>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
