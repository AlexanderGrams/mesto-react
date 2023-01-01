function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="gallery__card card">
      <img className="card__image" src={card.link} alt={`изображение: ${card._title}`} onClick={handleClick}/>
      <div className="card__interaction">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className="card__like-btn" type="button"></button>
          <p className="card__like-number">{card.likes.length}</p>
        </div>
      </div>
      <button className="card__basket" type="button"></button>
    </li>
   );
}

export default Card;
