const initialState = {
  title: "Registration Wizard",
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
};
export default reducers;
