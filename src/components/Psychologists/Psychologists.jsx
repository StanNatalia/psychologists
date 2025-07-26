import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase.js";
import css from "./Psychologists.module.css";
import FilterPsychologists from "../FilterPsychologists/FilterPsychologists.jsx";
import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [filterOption, setFilterOption] = useState("1");

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
