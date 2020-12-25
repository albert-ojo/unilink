import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  Image,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/Input";
import Card from "../../components/Card";
import * as authActions from "../../store/actions/auth";
import * as profileActions from "../../store/actions/profile";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const confirmPasscode = (passcode, password) => {
  if (passcode == password) {
  }
};

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.confirmPassword
      );
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
        props.navigation.navigate("SignUp");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
        props.navigation.navigate("App");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  //{isSignup ? "Login" : "Sign Up"}

  if (isSignup == true) {
    return (
      <View
        //source={require("../../assets/images/floor.png")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
          style={styles.screen}
        >
          <Card style={styles.authContainer1}>
            <View style={styles.TitleView}>
              <Text style={styles.mainTitle}>UNILINK</Text>
              <Text style={styles.sideTitle}>ENTREPRENEURS</Text>
            </View>
            <ScrollView>
              <Input
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
              />

              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={4}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={4}
                autoCapitalize="none"
                //errorText="Please enter the same password."
                onInputChange={inputChangeHandler}
                initialValue=""
                password={formState.inputValues.password}
                confirmPassword={formState.inputValues.confirmPassword}
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={"grey"} />
                ) : (
                  <Button
                    title={isSignup ? "Sign Up" : "Login"}
                    color={"#c21c20"}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  color="black"
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
          style={styles.screen}
        >
          <Card style={styles.authContainer}>
            <View style={styles.TitleView}>
              <Text style={styles.mainTitle}>UNILINK</Text>
              <Text style={styles.sideTitle}>ENTREPRENEURS</Text>
            </View>
            <ScrollView>
              <Input
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={4}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={"grey"} />
                ) : (
                  <Button
                    title={isSignup ? "Sign Up" : "Login"}
                    color={"#c21c20"}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  color="black"
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }
};

AuthScreen.navigationOptions = {
  headerTitle: "Authentication",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  authContainer1: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#002686",
    // justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "65%",
    height: "65%",
  },
  imageoutline: {},
  imageView: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  TitleView: {
    justifyContent: "center",
    alignContent: "center",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#708090",
  },
  sideTitle: { textAlign: "center", color: "#708090" },
});

export default AuthScreen;
