import React, {useEffect, useState} from 'react';
import {api} from "../../utils/Api.js"
import loading from "../../images/loading1.gif"
import Card from "../Card/Card.js"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('Имя');
  const [userDescription, setUserDescription] = useState('описание');
  const [userAvatar, setUserAvatar] = useState('https://yt3.ggpht.com/a/AATXAJwRvTiau7KTVs1zOjQpDibja-DNQFJcciWTXb69=s900-c-k-c0xffffffff-no-rj-mo');
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState('');
  const [loadingBoolean, setLoadingBoolean] = useState(false);

  //отрисовка инициализации
  useEffect(() => {
    Promise.all([
      api.getInfoUser(),
      api.getInitialCards()
    ])
      .then(([info, initialCards]) => {
        setUserId(info._id);
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setLoadingBoolean(true);
      });
  }, [])

  return (
    <>
      { loadingBoolean ?
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
        :
        <div className='loading-data'>
          <img className='loading-data__img' src={loading} alt='анимация загрузки'/>
        </div>
      }
    </>
  );
}

export default Main;
