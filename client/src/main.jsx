import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/configureStore";
import LoadingPage from "./components/LoadingPage.jsx";
import Axios from "axios";
import "./index.css";
import "react-phone-number-input/style.css";

const { store, persistor } = configureStore();

export const URL = import.meta.env.PROD
  ? import.meta.env.VITE_API
  : import.meta.env.VITE_API_URL;
export const axios = Axios.create({
  baseURL: URL,
});
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data.message === "jwt expired") {
      // store.dispatch(userLogout());
    }
    // For any other errors, simply return the error
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
