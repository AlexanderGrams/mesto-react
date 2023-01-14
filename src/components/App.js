import React, {useState, useEffect} from 'react';
import Header from "./Header/Header"
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup"
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
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

  function handleAddCrad({name, link}, setButtonLoading){
    api.giveCard(name, link)
      .then(newCard => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  function handleUpdateAvatar({avatar}, setButtonLoading){
    api.giveAvatar(avatar)
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

  //открытие попапов
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

  //закрытие всех попапов
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
          <AddPlacePopup onAddCrad={handleAddCrad} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <PopupWithForm name={'question-remove'} title={'Вы уверены?'} onClose={closeAllPopups} buttonText="да"></PopupWithForm>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  </>
  );
}

export default App;
