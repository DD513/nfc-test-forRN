// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import counterReducer from "./counterReducer";
import categoryReducer from "./categoryReducer";
// Redux: Root Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  category: categoryReducer,
});
// Exports
export default rootReducer;
