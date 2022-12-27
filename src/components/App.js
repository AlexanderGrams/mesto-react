import React from 'react';
import Header from "./Header/Header"
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";

function App() {
  //состояние попапа аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  //состояние попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  //состояние попапа добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closseAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
  <>
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
      <Footer />
      <PopupWithForm name={'edit-profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closseAllPopups}>
        <fieldset className="popup__editing-profille">
          <input id="name-input" className="popup__item popup__item_type_name" type="text" name="name" required minLength="2" maxLength="40" placeholder="Введите имя" />
          <span id="name-input-error" className="popup__text-error"></span>
          <input id="name-activity" className="popup__item popup__item_type_activity" type="text" name="activity" required minLength="2" maxLength="200" placeholder="Введите хобби" />
          <span id="name-activity-error" className="popup__text-error"></span>
        </fieldset>
        <input className="popup__button" type="submit" value="Сохранить" />
      </PopupWithForm>
      <PopupWithForm name={'add-card'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closseAllPopups}>
        <fieldset className="popup__editing-profille">
          <input id="title-input" className="popup__item popup__item_type_title" type="text" name="name" required minLength="2" maxLength="30" placeholder="Название" />
          <span id="title-input-error" className="popup__text-error"></span>
          <input id="link-input" className="popup__item popup__item_type_link" type="url" name="link" required placeholder="Ссылка на картинку" />
          <span id="link-input-error" className="popup__text-error"></span>
        </fieldset>
        <input className="popup__button" type="submit" value="Сохранить" />
      </PopupWithForm>
      <PopupWithForm name={'question-remove'} title={'Вы уверены?'} onClose={closseAllPopups}>
        <input className="popup__button" type="submit" value="да" />
      </PopupWithForm>
      <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closseAllPopups}>
        <fieldset className="popup__editing-profille">
          <input id="link-avatar-input" className="popup__item popup__item_type_link-avatar" type="url" name="link" required placeholder="Ссылка на картинку" />
          <span id="link-avatar-input-error" className="popup__text-error"></span>
        </fieldset>
        <input className="popup__button" type="submit" value="Сохранить" />
      </PopupWithForm>
      <ImagePopup />
    </div>
    <template id="card">
      <li className="gallery__card card">
        <img className="card__image" src="#" alt="" />
        <div className="card__interaction">
          <h2 className="card__title"></h2>
          <div className="card__like">
            <button className="card__like-btn" type="button"></button>
            <p className="card__like-number">0</p>
          </div>
        </div>
        <button className="card__basket" type="button"></button>
      </li>
    </template>
  </>
  );
}

export default App;
