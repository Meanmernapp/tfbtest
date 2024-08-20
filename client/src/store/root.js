import { combineReducers } from "redux";
import authReducer from "./authSlice";
import apiReducer from "./apiSlice";
import { query } from "./query";
const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  query: query.reducer,
});

export default rootReducer;
