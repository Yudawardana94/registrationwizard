import { useMemo } from "react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import reducers from "../reducers";

let store;

const initStore = (initialState) => {
  return createStore(reducers, initialState, applyMiddleware(ThunkMiddleware));
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
