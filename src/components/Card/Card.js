import React, {useContext} from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js"

function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  const currentUserData = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUserData._id;

  const isLiked = card.likes.some(i => i._id === currentUserData._id);
  const cardLikeButtonClassName = (
    `card__like-btn ${isLiked && 'card__like-btn_active'}`
  );

  return (
    <li className="gallery__card card">
      <img className="card__image" src={card.link} alt={`изображение: ${card.name}`} onClick={handleClick}/>
      <div className="card__interaction">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button"></button>
          {
            card.likes.length !== 0 ? <p className="card__like-number">{card.likes.length}</p> : ''
          }
        </div>
      </div>
      {isOwn && <button className='card__basket' />}
      {/* onClick={handleDeleteClick} */}
    </li>
   );
}

export default Card;
