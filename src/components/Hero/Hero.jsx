import css from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.wrapperInfo}>
        <h1 className={css.title}>
          The road to the <span className={css.span}>depths</span> of the human
          soul
        </h1>
        <p className={css.info}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <a href="" className={css.link}>
          Get started
          <svg width="15" height="17">
            <use href="/public/sprite.svg#icon-arrow"></use>
          </svg>
        </a>
      </div>
      <div className={css.wrapperPhoto}>
        <img
          src="/public/image.jpg"
          alt="Woman listening carefully"
          className={css.img}
        />
        <div className={css.rectangle}>
          <div className={css.square}>
            <svg width="30" height="30">
              <use href="/public/sprite.svg#icon-check-mark"></use>
            </svg>
          </div>
          <div className={css.detailWrapper}>
            <h3 className={css.about}>Experienced psychologists</h3>
            <p className={css.quantity}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
