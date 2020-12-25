import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProjectItem from "../../components/ProjectItem";
import { SAMPLEPROJECTS } from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import MyButton from "../../components/MyButton";
import Input from "../../components/Input";
import { showInterest } from "../../store/actions/projects";

// useEffect(() => {
//   props.navigation.setParams({ projectTitle: newProject.title });
// }, [newProject]);

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

const NewProjectScreen = (props) => {
  const [apply, setApply] = useState(false);
  const newProject = props.navigation.getParam("newProject");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const interestSubmit = async () => {
    let action;
    action = showInterest(
      // userProfile.id,
      userProfile.name,
      newProject.title,
      formState.inputValues.userMessage,
      // userProfile.userId,
      newProject.id,
      newProject.userId,
      "Pending..."
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("NewProjects");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userMessage: "",
    },
    inputValidities: {
      userMessage: true,
    },
    formIsValid: true,
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

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView>
          <View style={styles.screen}>
            <Card style={styles.cardView}>
              <View>
                <View style={styles.descriptionView}>
                  <Text style={styles.titleText}>Project Description</Text>
                  <Text>{newProject.description}</Text>
                </View>
                <View style={styles.skills}>
                  <Text style={styles.textText}>Skills needed: </Text>
                  <View style={{ flexDirection: "row" }}>
                    {newProject.skills &&
                      newProject.skills.map((skill) => {
                        return (
                          <View style={styles.skillView}>
                            <Text>{skill} </Text>
                          </View>
                        );
                      })}
                  </View>
                </View>
                <View style={styles.buttonView}>
                  <MyButton
                    title="Show Interest"
                    onPress={() => setApply((prevState) => !prevState)}
                  />
                  {apply && (
                    <View style={styles.popUp}>
                      <View style={styles.applyBox}>
                        <View style={styles.textInput}>
                          <Input
                            id="userMessage"
                            errorText="Please enter a valid message!"
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect={true}
                            multiline
                            numberOfLines={3}
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            initiallyValied={true}
                            required
                          />
                        </View>
                      </View>
                      <View style={styles.applyButton}>
                        <Button
                          title="Apply"
                          color="grey"
                          onPress={interestSubmit}
                        />
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.creditsView}>
                  <Text style={styles.nameText}>
                    Posted by {newProject.author} on {newProject.readableDate}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

NewProjectScreen.navigationOptions = (navData) => {
  const projectTitle = navData.navigation.getParam("projectTitle");
  return {
    headerTitle: projectTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
  },
  cardView: {
    //height: "95%",
    width: "95%",
    margin: 15,
    padding: 10,
  },
  creditsView: {
    flexDirection: "row",
    marginVertical: 15,
  },
  buttonView: {
    margin: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  skillsView: {
    marginVertical: 10,
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  applyBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "grey",
    height: "90%",
  },
  textInput: {},
  applyButton: {
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 5,
  },
  popUp: {
    height: 150,
    width: "90%",
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skillView: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 6,
    padding: 1,
  },
});

export default NewProjectScreen;
