import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../models/reducers/index";
import { rootSaga } from "./sagas/index";

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, createLogger())
);
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export { store };
