import { delay, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { GET_thisCategory } from "../../services/category";
// import { effectError } from "../utils/handleError";

export function* GET_thisCategorys({ id, callback }) {
  try {
    console.log("======GET_thisCategory_id======", id);
    const response = yield call(GET_thisCategory, id);
    console.log("======GET_thisCategory_res======", response);
    // yield put({
    //   type: 'SAVE_thisCategory',
    //   payload: response,
    // });
    // if (callback) callback(response);
    // message.info({ content: response.message, style: { marginTop: '50vh' } });
    // if (loading) loading(false);
  } catch (error) {
    // yield effectError(error, arguments[1]);
  }
}

// Watcher: Increase Counter Async
export function* watchGET_thisCategorys() {
  // Take Last Action Only
  yield takeLatest("GET_thisCategorys", GET_thisCategorys);
}
