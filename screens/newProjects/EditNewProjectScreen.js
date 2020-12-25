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
import * as projectActions from "../../store/actions/projects";
import Input from "../../components/Input";
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

const EditNewProjectScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const projectID = props.navigation.getParam("newProject");
  console.log("PROJECT TO BE EDITED", projectID);

  // const userInfo = useSelector((state) => state.profile.userProfile.name);
  // console.log("This is the profile", userInfo);

  // const userProjects = useSelector((state) => state.project.userNewProjects);
  // const currentProject = userProjects.find((item) => item.id == projectID);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: projectID.title,
      description: projectID.description,
      skills: projectID.skills,
      author: projectID.author,
    },
    inputValidities: {
      title: true,
      description: true,
      skills: true,
      author: true,
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
        projectActions.updateNewProject(
          projectID.id,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.skills,
          formState.inputValues.author
        )
      );

      props.navigation.navigate("userNewProjects");
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
      <ImageBackground
        source={require("../../assets/images/floor.png")}
        style={styles.background}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      </ImageBackground>
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
          <View style={styles.form}>
            <EditingInput
              id="title"
              label="Project Title"
              errorText="Please enter a valid title!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect={true}
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={projectID.title}
              initiallyValied={true}
              required
            />
            <EditingInput
              id="description"
              label="Description"
              errorText="Please enter a valid description!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect={true}
              multiline
              numberOfLines={3}
              onInputChange={inputChangeHandler}
              initialValue={projectID.description}
              initiallyValied={true}
              required
              minLength={4}
            />
            <EditingInput
              id="skills"
              label="Skills needed for project"
              errorText="Please enter skills!"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={projectID.skills}
              initiallyValied={true}
              required
            />
            <EditingInput
              id="author"
              label="Posted by"
              errorText="Please enter valid Author"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={projectID.author}
              initiallyValied={true}
              required
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

EditNewProjectScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Edit Project",
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default EditNewProjectScreen;
