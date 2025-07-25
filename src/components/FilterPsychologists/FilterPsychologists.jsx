import Select from "react-select";
import { CustomSelectStyles } from "./CustomSelectStyles";

const FilterPsychologists = ({ value, onChange }) => {
  const options = [
    { value: "1", label: "A to Z" },
    { value: "2", label: "Z to A" },
    { value: "3", label: "Less than 170$" },
    { value: "4", label: "Greater than 170$" },
    { value: "5", label: "Popular" },
    { value: "6", label: "Not popular" },
    { value: "7", label: "Show all" },
  ];

  return (
    <div>
      <Select
        options={options}
        placeholder="A to Z"
        value={options.find((opt) => opt.value === value)}
        onChange={(selected) => onChange(selected.value)}
        styles={CustomSelectStyles}
        menuPosition="absolute"
      />
    </div>
  );
};

export default FilterPsychologists;
