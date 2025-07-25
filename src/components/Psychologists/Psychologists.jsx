import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase.js";
import css from "./Psychologists.module.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal.jsx";
import FilterPsychologists from "../FilterPsychologists/FilterPsychologists.jsx";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [selectedPsych, setSelectedPsych] = useState(null);
  const [filterOption, setFilterOption] = useState(1);

  const handleToggleMore = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

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

  const getFilteredPsychologists = () => {
    const sorted = [...psychologists];

    switch (filterOption) {
      case "1": // A to Z
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "2": // Z to A
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "3": // Less than 170$
        return sorted.filter((p) => p.price_per_hour < 170);
      case "4": // Greater than 170$
        return sorted.filter((p) => p.price_per_hour > 170);
      case "5": // Popular
        return sorted.sort((a, b) => b.rating - a.rating);
      case "6": // Not popular
        return sorted.sort((a, b) => a.rating - b.rating);
      case "7": // Show all
      default:
        return sorted;
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.psychWrapper}>
        <div className={css.filterWrapper}>
          <h5 className={css.filter}>Filter</h5>
          <FilterPsychologists
            value={filterOption}
            onChange={setFilterOption}
          />
        </div>
        <ul className={css.list}>
          {getFilteredPsychologists()
            .slice(0, visibleCount)
            .map((psych, index) => (
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
                    <div className={css.statisticsWrapper}>
                      <svg width="16" height="16" className={css.starIcon}>
                        <use href="/sprite.svg#icon-favorite" />
                      </svg>
                      <p className={css.rating}>Rating: {psych.rating}</p>

                      <span className={css.separator}></span>
                      <p className={css.price}>
                        Price / 1 hour:{" "}
                        <span className={css.priceSpan}>
                          {psych.price_per_hour} $
                        </span>
                      </p>

                      <svg width="26" height="22">
                        <use href="/sprite.svg#icon-not-favorite" />
                      </svg>
                    </div>
                  </div>
                  <h3 className={css.name}>{psych.name}</h3>

                  <div className={css.detailWrapper}>
                    <p className={css.details}>
                      <span className={css.detailsSpan}>Experience: </span>
                      {psych.experience}
                    </p>
                    <p className={css.details}>
                      <span className={css.detailsSpan}>License: </span>
                      {psych.license}
                    </p>
                    <p className={css.details}>
                      <span className={css.detailsSpan}>Specialization: </span>
                      {psych.specialization}
                    </p>
                    <p className={css.details}>
                      <span className={css.detailsSpan}>
                        Initial_consultation:
                      </span>
                      {psych.initial_consultation}
                    </p>
                  </div>
                  <p className={css.about}>{psych.about}</p>
                  <button
                    className={css.btnMore}
                    onClick={() => handleToggleMore(index)}
                  >
                    {expandedIndexes.includes(index) ? null : "Read more"}
                  </button>
                  {expandedIndexes.includes(index) && (
                    <div className={css.moreInfo}>
                      <div className={css.reviewWrapper}>
                        {psych.reviews?.map((review, index) => (
                          <div key={index} className={css.reviewItem}>
                            <div className={css.reviewDetail}>
                              <div className={css.circle}>
                                {review.reviewer[0]}
                              </div>
                              <div>
                                <p className={css.reviewer}>
                                  {review.reviewer}
                                </p>
                                <div className={css.reviewRatingWrapper}>
                                  <svg
                                    width="16"
                                    height="16"
                                    className={css.starIcon}
                                  >
                                    <use href="/sprite.svg#icon-favorite" />
                                  </svg>
                                  <p className={css.reviewRating}>
                                    {review.rating}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className={css.comment}>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        className={css.itemBtn}
                        onClick={() => setSelectedPsych(psych)}
                      >
                        Make an appointment
                      </button>
                      {selectedPsych && (
                        <AppointmentModal
                          psychologist={selectedPsych}
                          onClose={() => setSelectedPsych(null)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {visibleCount < psychologists.length && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Psychologists;
