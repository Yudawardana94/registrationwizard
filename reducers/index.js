import * as types from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  title: "Registration Wizard",
  userData: {
    name: "",
    polisId: "",
    licence: "",
    period: {
      startDate: "",
      endDate: "",
    },
    price: 0,
    machine: {
      brand: "",
      productionYear: null,
      machineNumber: "",
      chassisNumber: "",
    },
  },
  // userData: {
  //   name: "Setiawan Dwi Cahyo",
  //   polisId: "PLS-97836OC",
  //   licence: "AD 1234 OGE",
  //   period: {
  //     startDate: "2021-10-22",
  //     endDate: "2023-10-22",
  //   },
  //   price: 2000000000,
  //   machine: {
  //     brand: "Yamahmud",
  //     productionYear: 2019,
  //     machineNumber: "YMM-79836-BE-999",
  //     chassisNumber: "CSS-9876-FE-1111",
  //   },
  // },
  registeredLicence: "AD 1234 OGE",
  dataFormG: {
    residenceId: "",
    victim: "",
    wound: null,
    age: "",
    gender: null,
    phone: "",
    address: "",
    date: "",
    detail: "",
    place: "",
  },
  imageUpload: null,
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload };
    case types.INIT:
      return {
        ...state,
        userData: payload,
      };
    case types.ADD_FORM_DATA:
      return {
        ...state,
        dataFormG: payload,
      };
    case types.ADD_IMAGE_DATA:
      return {
        ...state,
        imageUpload: payload,
      };
    default:
      return state;
  }
};
export default reducers;
