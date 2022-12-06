import * as types from "../types";

export const initApps = () => (dispatch) =>
  setInterval(() => {
    dispatch({
      type: "types.INIT",
      payload: { appName: "Registration Wizzard" },
    });
  }, 1000);
