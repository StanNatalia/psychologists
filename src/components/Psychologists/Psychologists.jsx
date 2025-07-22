import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase.js";
import css from "./Psychologists.module.css";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const dataRef = ref(db, "psychologists");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const psychologistsArray = Object.values(data);
        setPsychologists(psychologistsArray);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.filterWrapper}>
        <h5 className={css.filter}>Filter</h5>
        <input />
        {/* <Select
          name="filter"
          options={[
            { value: 30, label: "A to Z" },
            { value: 40, label: "Less than 10$" },
            { value: 50, label: "Greater than 10$" },
            { value: 60, label: "Popular" },
            { value: 70, label: "Not popular" },
            { value: 80, label: "Show all" },
          ]}
          placeholder="A to Z"
          //   styles={stylesPriceSelector}
          //   components={BrandComponents}
          //   value={
          //     brandOptions.find((option) => option.value === values.brand) || null
          //   }
          //   onChange={(selectedOption) =>
          //     setFieldValue("brand", selectedOption.value)
          //   }
        /> */}
      </div>
      <div className={css.psychologistsWrapper}>
        <ul className={css.list}>
          {psychologists.slice(0, visibleCount).map((psych, index) => (
            <li key={index} className={css.item}>
              <div className={css.imgWrapper}>
                <img
                  className={css.img}
                  src={psych.avatar_url}
                  alt={psych.name}
                  width={100}
                />
              </div>

              <div className={css.infoWrapper}>
                <div className={css.favoriteWrapper}>
                  <h3 className={css.title}>Psychologist</h3>
                  <div className={css.ratingWrapper}>
                    <svg width="16" height="16">
                      <use href="/public/sprite.svg#icon-favorite" />
                    </svg>
                    <p>Rating: {psych.rating}</p>
                    <p>Price / 1 hour: {psych.price_per_hour} $</p>
                    <svg width="26" height="22">
                      <use href="/public/sprite.svg#icon-favorite" />
                    </svg>
                  </div>
                </div>
                <h3 className={css.name}>{psych.name}</h3>

                <div className={css.detailWrapper}>
                  <span className={css.details}>
                    Experience:{psych.experience}
                  </span>
                  <span className={css.details}>License:{psych.license}</span>
                  <span className={css.details}>
                    Specialization:{psych.specialization}
                  </span>
                  <span className={css.details}>
                    Initial_consultation:{psych.initial_consultation}
                  </span>
                </div>
                <p className={css.about}>{psych.about}</p>
              </div>
              <button className={css.btnMore}>Read More</button>
            </li>
          ))}
        </ul>

        {visibleCount < psychologists.length && (
          <button className={css.btn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Psychologists;
