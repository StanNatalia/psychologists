import { useState } from "react";
import css from "./PsychologistCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleFavorite } from "../../redux/favorite/favoriteSlice";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { FaStar } from "react-icons/fa";
import { selectToken } from "../../redux/user/userSelectors";
import { selectFavorites } from "../../redux/favorite/favoritesSelectors";

const PsychologistCard = ({
  psych,
  index,
  expandedIndexes,
  handleToggleMore,
}) => {
  const [selectedPsych, setSelectedPsych] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites || []);
  const token = useSelector(selectToken);
  const isFavorite = Array.isArray(favorites) && favorites.includes(psych.name);
  const handleFavoriteClick = (name) => {
    if (!token) {
      toast.warn("Please log in to use favorites");
      return;
    }
    dispatch(toggleFavorite(name));
  };

  {
    Array.isArray(expandedIndexes) && expandedIndexes.includes(index)
      ? null
      : "Read more";
  }

  return (
    <li key={psych.name} className={css.item}>
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
            <FaStar className={css.starIcon} />
            <p className={css.rating}>Rating: {psych.rating}</p>

            <span className={css.separator}></span>
            <p className={css.price}>
              Price / 1 hour:{" "}
              <span className={css.priceSpan}>{psych.price_per_hour} $</span>
            </p>

            <svg
              width="26"
              height="22"
              onClick={() => handleFavoriteClick(psych.name)}
              className={css.favoriteIcon}
            >
              <use
                href={
                  isFavorite
                    ? "/sprite.svg#icon-favorite"
                    : "/sprite.svg#icon-not-favorite"
                }
              />
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
            <span className={css.detailsSpan}>Initial_consultation:</span>
            {psych.initial_consultation}
          </p>
        </div>
        <p className={css.about}>{psych.about}</p>
        <button className={css.btnMore} onClick={() => handleToggleMore(index)}>
          {expandedIndexes.includes(index) ? null : "Read more"}
        </button>
        {expandedIndexes.includes(index) && (
          <div className={css.moreInfo}>
            <div className={css.reviewWrapper}>
              {psych.reviews?.map((review, index) => (
                <div key={index} className={css.reviewItem}>
                  <div className={css.reviewDetail}>
                    <div className={css.circle}>{review.reviewer[0]}</div>
                    <div>
                      <p className={css.reviewer}>{review.reviewer}</p>
                      <div className={css.reviewRatingWrapper}>
                        <FaStar className={css.starIcon} />
                        <p className={css.reviewRating}>{review.rating}</p>
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
  );
};

export default PsychologistCard;
