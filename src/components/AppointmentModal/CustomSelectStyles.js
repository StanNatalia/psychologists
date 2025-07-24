export const CustomSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "0px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(25, 26, 21, 0.1)",
    backgroundColor: "#fbfbfb",
    cursor: "pointer",
    height: "52px",
    width: "232px",
    boxShadow: "none",
    outline: "none",
    borderColor: state.isFocused
      ? "rgba(25, 26, 21, 0.1)"
      : "rgba(25, 26, 21, 0.1)",
    "&:hover": {
      borderColor: "rgba(25, 26, 21, 0.3)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#f0f0f0"
      : state.isFocused
      ? "#f5f5f5"
      : "#fff",
    color: "#191a15",
    padding: "10px",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#191a15",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
