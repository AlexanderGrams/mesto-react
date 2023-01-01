import React, {useState} from 'react';
import Header from "./Header/Header"
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";

function App() {
  //состояние попапа аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  //состояние попапа добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  //состояние попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  //состояние попапа полноразмерной картинки
  const [selectedCard, setSelectedCard] = useState({})
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closseAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
  <>
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm name={'edit-profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closseAllPopups} buttonText="Сохранить">
        <fieldset className="popup__editing-profille">
          <input id="name-input" className="popup__item popup__item_type_name" type="text" name="name" required minLength="2" maxLength="40" placeholder="Введите имя" />
          <span id="name-input-error" className="popup__text-error"></span>
          <input id="name-activity" className="popup__item popup__item_type_activity" type="text" name="activity" required minLength="2" maxLength="200" placeholder="Введите хобби" />
          <span id="name-activity-error" className="popup__text-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name={'add-card'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closseAllPopups} buttonText="Сохранить">
        <fieldset className="popup__editing-profille">
          <input id="title-input" className="popup__item popup__item_type_title" type="text" name="name" required minLength="2" maxLength="30" placeholder="Название" />
          <span id="title-input-error" className="popup__text-error"></span>
          <input id="link-input" className="popup__item popup__item_type_link" type="url" name="link" required placeholder="Ссылка на картинку" />
          <span id="link-input-error" className="popup__text-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name={'question-remove'} title={'Вы уверены?'} onClose={closseAllPopups} buttonText="да"></PopupWithForm>
      <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closseAllPopups} buttonText="Сохранить">
        <fieldset className="popup__editing-profille">
          <input id="link-avatar-input" className="popup__item popup__item_type_link-avatar" type="url" name="link" required placeholder="Ссылка на картинку" />
          <span id="link-avatar-input-error" className="popup__text-error"></span>
        </fieldset>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closseAllPopups}/>
    </div>
  </>
  );
}

export default App;
