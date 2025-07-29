import { useDispatch, useSelector } from "react-redux";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./Favorites.module.css";
import { filterPsychologists } from "../../utils/filterPsychologists";
import FilterPsychologists from "../FilterPsychologists/FilterPsychologists";
import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import { selectFavorites } from "../../redux/favorite/favoritesSelectors";
import {
  selectIsLoading,
  selectPsychologists,
} from "../../redux/psychologists/psychologistSelectors";
import { ClockLoader } from "react-spinners";

const Favorites = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [filterOption, setFilterOption] = useState("1");
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (psychologists.length === 0) {
      dispatch(fetchPsychologists());
    }
  }, [dispatch, psychologists.length]);

  const favorites = useSelector(selectFavorites);

  const favoritePsychs = psychologists.filter((p) =>
    favorites.includes(p.name)
  );

  const handleToggleMore = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const filterFavorites = filterPsychologists(favoritePsychs, filterOption);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className={css.wrapper}>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <ClockLoader color="var(--main-button)" size={60} />
        </div>
      ) : favoritePsychs.length > 0 ? (
        <div className={css.psychWrapper}>
          <div className={css.filterWrapper}>
            <h5 className={css.filter}>Filter</h5>
            <FilterPsychologists
              value={filterOption}
              onChange={setFilterOption}
            />
          </div>

          <ul className={css.favoritesWrapper}>
            {filterFavorites.slice(0, visibleCount).map((psych, index) => (
              <PsychologistCard
                key={psych.name}
                psych={psych}
                index={index}
                expandedIndexes={expandedIndexes}
                handleToggleMore={handleToggleMore}
              />
            ))}
          </ul>

          {visibleCount < filterFavorites.length && (
            <button className={css.btn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      ) : (
        <p className={css.text}>You don't have any favorites yet</p>
      )}
    </div>
  );
};

export default Favorites;
