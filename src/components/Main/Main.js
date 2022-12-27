function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  return (
    <main className="main">
      <section className="profile" aria-label="Секция с информацией профиля">
        <button className="profile__btn-avatar" onClick={onEditAvatar}>
          <img className="profile__avatar-image" src="#" alt="Аватар" />
          <div className="profile__avatar"></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">Имя</h1>
          <button className="profile__info-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">Хобби</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Секция с картинками профиля">
        <ul className="gallery__cards">
        </ul>
      </section>
    </main>
  );
}

export default Main;
