import { useEffect } from "react";
import "../styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import user from "../reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ user });

const persistConfig = { key: "hackatweet", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Charge le CSS de Modal côté client
    import("antd/lib/modal/style/index.css");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Hakatweet</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
