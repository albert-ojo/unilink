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
import EditingInput from "../../components/EditingInput";

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

const EditProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedProfile = props.navigation.getParam("profileInfo");
  console.log("This is edited profile", editedProfile);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullName: editedProfile.name,
      email: editedProfile.email,
      university: editedProfile.university,
      yearOfStudy: editedProfile.year,
      cellNo: editedProfile.cellNo,
      otherSkills: editedProfile.skills,
      degree: editedProfile.degree,
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
    console.log("This IS EDITED ID", editedProfile.id);

    setError(null);
    setIsLoading(true);
    try {
      dispatch(
        profileActions.updateProfile(
          editedProfile.id,
          formState.inputValues.fullName,
          formState.inputValues.university,
          formState.inputValues.degree,
          formState.inputValues.yearOfStudy,
          formState.inputValues.otherSkills,
          formState.inputValues.cellNo,
          formState.inputValues.email
        )
      );

      props.navigation.navigate("Profile");
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
        keyboardVerticalOffset={40}
      >
        <ScrollView>
          <View style={styles.screen}>
            <EditingInput
              id="fullName"
              label="Name and Surname"
              keyboardType="default"
              required
              autoCapitalize="words"
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.name}
            />
            <EditingInput
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.email}
            />
            <EditingInput
              id="cellNo"
              label="Cellphone Number"
              keyboardType="number-pad"
              required
              autoCapitalize="none"
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.cellNo}
            />
            <EditingInput
              id="university"
              label="University"
              keyboardType="default"
              required
              autoCapitalize="words"
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.university}
            />
            <EditingInput
              id="degree"
              label="Degree"
              keyboardType="default"
              required
              autoCapitalize="words"
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.degree}
            />
            <EditingInput
              id="yearOfStudy"
              label="Year of Study"
              keyboardType="number-pad"
              required
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.year}
            />
            <EditingInput
              id="otherSkills"
              label="Skills"
              keyboardType="default"
              required
              autoCapitalize="sentences"
              onInputChange={inputChangeHandler}
              initialValue={editedProfile.skills}
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
EditProfileScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Profile",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconSize={32}
          iconName={"md-checkmark"}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
  },
});

export default EditProfileScreen;
