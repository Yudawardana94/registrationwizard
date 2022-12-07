import * as types from "../types";

export const initApps = () => (dispatch) =>
  dispatch({
    type: types.INIT,
    payload: {
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
  });

export const saveData =
  // ({}) =>
  (formData) => ({
    type: types.ADD_FORM_DATA,
    payload: formData,
  });
export const saveImage = (base64) => (dispatch) => {
  return dispatch({
    type: types.ADD_IMAGE_DATA,
    payload: base64,
  });
};
