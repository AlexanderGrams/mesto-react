import React from 'react';
import {api} from "../../utils/Api.js"
import Card from "../Card/Card.js"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  //Имя пользователя
  const [userName, setUserName] = React.useState('Имя')
  function getUserName(name) {
    setUserName(name)
  }

  //описание пользователя
  const [userDescription, setUserDescription] = React.useState('описание')
  function getUserDescription(description) {
    setUserDescription(description)
  }

  //аватар пользователя
  const [userAvatar, setUserAvatar] = React.useState('https://yt3.ggpht.com/a/AATXAJwRvTiau7KTVs1zOjQpDibja-DNQFJcciWTXb69=s900-c-k-c0xffffffff-no-rj-mo')
  function getUserAvatar(avatar) {
    setUserAvatar(avatar)
  }

  //карточки
  const [cards, setCards] = React.useState([])
  function getCards(cards) {
    setCards(cards)
  }

  let userId

  //отрисовка инициализации
  React.useEffect(() => {
    Promise.all([
      api.getInfoUser(),
      api.getInitialCards()
    ])
      .then(([info, initialCards]) => {
        userId = info._id;
        getUserName(info.name);
        getUserDescription(info.about);
        getUserAvatar(info.avatar);
        getCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <main className="main">
      <section className="profile" aria-label="Секция с информацией профиля">
        <button className="profile__btn-avatar" onClick={onEditAvatar}>
          <img className="profile__avatar-image" src={userAvatar} alt="Аватар" />
          <div className="profile__avatar"></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__info-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Секция с картинками профиля">
        <ul className="gallery__cards">
          {
            cards.map(card => {
              return (
                <Card card={card} onCardClick={onCardClick} key={card._id}/>
              )
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
