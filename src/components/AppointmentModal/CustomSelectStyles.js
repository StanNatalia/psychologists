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
    color: state.isDisabled || state.isSelected ? "#191a15" : "#8a8a89",
    backgroundColor: "transparent",
    paddingBottom: "0",
    cursor: "pointer",
    textAlign: state.isDisabled ? "left" : "center",
    fontSize: "16px",
    marginBottom: "3px",
    lineHeight: 1.25,
    fontWeight: "500",
    fontFamily: "Inter, sans-serif",
    "&:hover": {
      backgroundColor: "transparent",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    width: "160px",
    right: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    paddingLeft: 10,
    paddingTop: 16,
    paddingBottom: 16,
    maxHeight: "180px",
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#191a15",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
