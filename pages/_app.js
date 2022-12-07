// import { Provider } from "react-redux";
// import { wrapper, store } from "../store";

// import "../styles/globals.css";
// import "antd/dist/antd";

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default wrapper.withRedux(MyApp);

import { Provider } from "react-redux";
import { useStore } from "../store";

import "../styles/globals.css";
import "antd/dist/antd";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
