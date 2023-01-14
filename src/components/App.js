import React, {useState, useEffect} from 'react';
import Header from "./Header/Header"
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup"
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardContext} from '../contexts/CurrentCardContext';
import loading from "../images/loading.gif";

function App() {
  //состояние попапа аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //состояние попапа добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //состояние попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //состояние попапа полноразмерной картинки
  const [selectedCard, setSelectedCard] = useState({});
  //данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  //данные карточек
  const [currentCards, setCurrentCards] = useState([]);
  //загрузка страницы
  const [loadingBoolean, setLoadingBoolean] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getInfoUser(),
      api.getInitialCards()
    ])
      .then(([info, initialCards]) => {
        setCurrentUser(info);
        setCurrentCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setLoadingBoolean(true);
      });
  },[])

  function handleCardLike(card) {
    //проверяем, есть ли лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(nameUser, description, setButtonLoading){
    api.giveInfoUser(nameUser, description)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  function handleCardDelete(card) {
    api.deletCard(card._id);
    setCurrentCards(currentCards.filter(elem => elem._id !== card._id))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  return (
  <>
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={currentCards}>
          <Header />
          {loadingBoolean ?
            <Main onCardLike={handleCardLike} onCardDelet={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
            :
            <div className='loading-data'>
              <img className='loading-data__img' src={loading} alt='анимация загрузки'/>
            </div>
          }
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <PopupWithForm name={'add-card'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <fieldset className="popup__editing-profille">
              <input id="title-input" className="popup__item popup__item_type_title" type="text" name="name" required minLength="2" maxLength="30" placeholder="Название" />
              <span id="title-input-error" className="popup__text-error"></span>
              <input id="link-input" className="popup__item popup__item_type_link" type="url" name="link" required placeholder="Ссылка на картинку" />
              <span id="link-input-error" className="popup__text-error"></span>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm name={'question-remove'} title={'Вы уверены?'} onClose={closeAllPopups} buttonText="да"></PopupWithForm>
          <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <fieldset className="popup__editing-profille">
              <input id="link-avatar-input" className="popup__item popup__item_type_link-avatar" type="url" name="link" required placeholder="Ссылка на картинку" />
              <span id="link-avatar-input-error" className="popup__text-error"></span>
            </fieldset>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  </>
  );
}

export default App;
