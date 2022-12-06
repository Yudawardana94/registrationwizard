const initialState = {
  title: "Registration Wizard",
  userData: {
    name: "Setiawan Dwi Cahyo",
    polisId: "PLS-97836OC",
    licence: "AD 1234 OGE",
    period: {
      startDate: "2021-10-22",
      endDate: "2023-10-22",
    },
    price: 2000000000,
    machine: {
      brand: "Yamahmud",
      productionYear: 2019,
      machineNumber: "YMM-79836-BE-999",
      chassisNumber: "CSS-9876-FE-1111",
    },
  },
  registeredLicence: "AD 1234 OGE",
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
