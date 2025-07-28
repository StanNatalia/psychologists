export const filterPsychologists = (psychologists, filterOption) => {
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
