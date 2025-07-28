import { useSelector } from "react-redux";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./Favorites.module.css";
import { filterPsychologists } from "../../utils/filterPsychologists";
import FilterPsychologists from "../FilterPsychologists/FilterPsychologists";
import { useState } from "react";

const Favorites = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [filterOption, setFilterOption] = useState("1");
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const favorites = useSelector((state) => state.favorites.favorites);
  const psychologists = useSelector((state) => state.psychologists.all);

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
      {favoritePsychs.length > 0 ? (
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
        </div>
      ) : (
        <p className={css.text}>No favorites</p>
      )}

      {visibleCount < filterFavorites.length && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Favorites;
