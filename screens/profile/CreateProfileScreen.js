import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  Platform,
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Input from "../../components/Input";
import * as profileActions from "../../store/actions/profile";
import Card from "../../components/Card";

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

const CreateProfileScreen = (props) => {
  console.log("CREATE PROFILE SCREEN!!!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  console.log("This is intial value for email", userEmail);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullName: "",
      email: userEmail,
      university: "",
      yearOfStudy: "",
      cellNo: "",
      otherSkills: "",
      degree: "",
    },
    inputValidities: {
      email: true,
      fullName: true,
      university: true,
      yearOfStudy: true,
      cellNo: true,
      otherSkills: true,
      degree: true,
    },
    formIsValid: true,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      dispatch(
        profileActions.createProfile(
          formState.inputValues.fullName,
          formState.inputValues.university,
          formState.inputValues.degree,
          formState.inputValues.yearOfStudy,
          formState.inputValues.otherSkills,
          formState.inputValues.cellNo,
          formState.inputValues.email
        )
      );

      props.navigation.navigate("App");
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <Card style={styles.cardStyle}>
            <View style={styles.screen}>
              <Input
                id="fullName"
                label="Name and Surname"
                keyboardType="default"
                required
                autoCapitalize="words"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue={userEmail}
              />
              <Input
                id="cellNo"
                label="Cellphone Number"
                keyboardType="number-pad"
                required
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="university"
                label="University"
                keyboardType="default"
                required
                autoCapitalize="words"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="degree"
                label="Degree"
                keyboardType="default"
                required
                autoCapitalize="words"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="yearOfStudy"
                label="Year of Study"
                keyboardType="number-pad"
                required
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="otherSkills"
                label="Skills"
                keyboardType="default"
                required
                autoCapitalize="sentences"
                onInputChange={inputChangeHandler}
                initialValue=""
                numberOfLines={3}
              />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
CreateProfileScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Create Profile",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={"md-checkmark"}
          iconSize={32}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "center",
  },
  cardStyle: {
    margin: 20,
    padding: 10,
    marginTop: 30,
  },
});

export default CreateProfileScreen;
