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
import Card from "../../components/Card";
import TagInput from "react-native-tags-input";

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

const CreateProjectScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [tagsArray, setTagsArray] = useState([]);
  const [tag, setTag] = useState("");

  const userInfo = useSelector((state) => state.profile.userProfile.name);

  const updateTag = (value) => {
    setTag(value.tag);
    setTagsArray(value.tagsArray);
    console.log("tags array", tagsArray);
  };

  const tags = { tag, tagsArray };
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: "",
      skills: tagsArray,
      author: userInfo,
    },
    inputValidities: {
      title: false,
      description: false,
      skills: true,
      author: true,
    },
    formIsValid: false,
  });

  useEffect(() => {
    formState.inputValues.skills = tagsArray;
    console.log("This is formstate", formState.inputValues);
  }, [updateTag]);

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
    console.log("This is sent to ACTION:", formState.inputValues);
    try {
      dispatch(
        projectActions.createNewProject(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.skills,
          formState.inputValues.author
        )
      );

      props.navigation.goBack();
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
        keyboardVerticalOffset={0}
      >
        <ScrollView>
          <Card style={styles.cardStyle}>
            <View style={styles.form}>
              <Input
                id="title"
                label="Project Title"
                errorText="Please enter a valid title!"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={true}
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValied={false}
                required
              />
              <Input
                id="description"
                label="Description"
                errorText="Please enter a valid description!"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={true}
                multiline
                numberOfLines={3}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValied={false}
                required
                minLength={4}
              />
              <View style={styles.skillsView}>
                <Text style={styles.skillsLabel}>
                  Skills Needed for the Project
                </Text>
                <TagInput
                  placeholder="Skills..."
                  inputStyle={styles.skillsInputs}
                  updateState={(value) => {
                    updateTag(value);
                  }}
                  tags={tags}
                />
              </View>
              <Input
                id="author"
                label="Posted by"
                errorText="Please enter valid Author"
                keyboardType="default"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue={userInfo}
                initiallyValied={false}
                required
              />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

CreateProjectScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Create a Project",
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
    // justifyContent: "center",
  },
  cardStyle: {
    margin: 20,
    padding: 10,
    marginTop: 30,
  },
  form: {
    margin: 20,
  },
  skillsLabel: {
    fontWeight: "bold",
    margin: 3,
  },
  skillsView: {
    borderWidth: 2,
    marginVertical: 20,
    borderColor: "grey",
    paddingVertical: 10,
    borderRadius: 5,
  },
  skillsInputs: {
    fontSize: 16,
  },
});

export default CreateProjectScreen;
