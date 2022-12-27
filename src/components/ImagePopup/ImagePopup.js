function ImagePopup() {
  return (
    <div className="popup popup_type_zoom-img">
      <div className="popup__container popup__container_type_zoom-img">
        <img className="popup__image" src="#" alt="" />
        <h2 className="popup__signature">#</h2>
        <button className="popup__close" type="button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
