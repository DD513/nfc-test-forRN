// Imports: Dependencies
import React from "react";
import { Provider } from "react-redux";
// Imports: Screens
import RootNavigation from "./app/navigation/index";
// Imports: Redux Store
import { store } from "./app/store/index";
import ApiConfig from "./app/config/api-config";

// React Native App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <RootNavigation></RootNavigation>
    </Provider>
  );
};
