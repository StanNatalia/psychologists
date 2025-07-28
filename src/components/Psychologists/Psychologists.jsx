import { useEffect, useState } from "react";
import css from "./Psychologists.module.css";
import FilterPsychologists from "../FilterPsychologists/FilterPsychologists.jsx";
import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologists } from "../../redux/psychologists/operations.js";
import { filterPsychologists } from "../../utils/filterPsychologists.js";

const Psychologists = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [filterOption, setFilterOption] = useState("1");

  const dispatch = useDispatch();

  const psychologists = useSelector((state) => state.psychologists.all);

  const handleToggleMore = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

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
          {filterPsychologists(psychologists, filterOption)
            .slice(0, visibleCount)
            .map((psych, index) => (
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

      {visibleCount < psychologists.length && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Psychologists;
