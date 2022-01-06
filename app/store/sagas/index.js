// Imports: Dependencies
import { all, fork } from "redux-saga/effects";
// Imports: Redux Sagas
import { watchIncreaseCounter, watchDecreaseCounter } from "./counterSaga";
import { watchGET_thisCategorys } from "./categorySaga";
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(watchIncreaseCounter),
    fork(watchDecreaseCounter),

    // Category
    fork(watchGET_thisCategorys),
  ]);
}
