import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import NavigationContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth";
import checkedReducer from "./store/reducers/checked";
import profileReducer from "./store/reducers/profile";
import projectReducer from "./store/reducers/projects";

const rootReducer = combineReducers({
  auth: authReducer,
  check: checkedReducer,
  profile: profileReducer,
  project: projectReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "freightSans-Medium": require("./assets/fonts/FreightSans-Medium.otf"),
    "pt-sans": require("./assets/fonts/PTSans-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
