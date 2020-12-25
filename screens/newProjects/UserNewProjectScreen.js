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
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProjectItem from "../../components/ProjectItem";
import { SAMPLEPROJECTS } from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import MyButton from "../../components/MyButton";
import {
  showInterest,
  fetchInterests,
  accpetInterest,
  moveToCurrentProjects,
} from "../../store/actions/projects";
import Interested from "../../components/Interested";

const UserNewProjectScreen = (props) => {
  const [apply, setApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadInterests = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(fetchInterests());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    props.navigation.setParams({ projectInfo: newProject });
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadInterests
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadInterests]);

  useEffect(() => {
    setIsLoading(true);
    loadInterests().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadInterests]);

  const newProject = props.navigation.getParam("newProject");
  const currentProjectId = newProject.id;
  const ownerInterests = useSelector((state) => state.project.ownerInterests);
  const projectInterests = ownerInterests.filter(
    (prod) => prod.projectId == currentProjectId
  );
  const sizeWidth = Dimensions.get("window").width;

  const members = projectInterests.filter((prod) => prod.status == "Accepted");
  console.log("Members:", members);

  const currProjects = useSelector((state) => state.project.currentProjects);
  console.log("Current Projects", currProjects);
  const findMembers = () => {};

  const startProject = (newProjectId, title, description, author, members) =>
    Alert.alert(
      "START PROJECT",
      "Are you ready to start working on the project?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(
              moveToCurrentProjects(
                newProjectId,
                title,
                description,
                author,
                members
              )
            );
          },
        },
      ]
    );

  const interstDecision = (interestId) =>
    Alert.alert(
      "Accept or Deny",
      "Do you want this user to work on this project with you?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "No",
          onPress: () => {
            dispatch(accpetInterest(interestId, "Denied"));
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(accpetInterest(interestId, "Accepted"));
          },
        },
      ]
    );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again" onPress={loadInterests} color="grey" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  // useEffect(() => {
  //   props.navigation.setParams({ projectInfo: newProject });
  // }, [newProject]);

  if (sizeWidth <= 600) {
    return (
      <ImageBackground
        source={require("../../assets/images/floor.png")}
        style={styles.background}
      >
        <ScrollView>
          <View style={styles.screen}>
            <Card style={styles.cardView}>
              <View style={styles.descriptionView}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.titleText}>Project Description</Text>
                </View>
                <Text style={styles.decsText}>{newProject.description}</Text>
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
              <View style={styles.interestedView}>
                <Text style={styles.titleText}>Users Interested:</Text>
                <View style={styles.flatlist}>
                  <FlatList
                    data={projectInterests}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                      <Interested
                        name={itemData.item.userName}
                        message={itemData.item.userMessage}
                        status={itemData.item.status}
                        onSelect={() => {
                          props.navigation.navigate({
                            routeName: "ViewProfile",
                            params: { profileId: itemData.item.userId },
                          });
                        }}
                        onDecide={() => {
                          interstDecision(itemData.item.id);
                        }}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={styles.creditsView}>
                <Text style={styles.nameText}>
                  Posted by {newProject.author} on {newProject.readableDate}
                </Text>
              </View>
            </Card>
            <View style={styles.start}>
              <MyButton
                onPress={() => {
                  console.log("newProject:", newProject);
                  startProject(
                    newProject.id,
                    newProject.title,
                    newProject.description,
                    newProject.author,
                    members
                  );
                }}
                title="Start Project"
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require("../../assets/images/floor.png")}
        style={styles.background}
      >
        <ScrollView>
          <View style={styles.screen}>
            <Card style={styles.cardView}>
              <View style={styles.descriptionView}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.titleText}>Project Description</Text>
                </View>
                <Text style={styles.decsText}>{newProject.description}</Text>
              </View>
              <View style={styles.skillsView}>
                <Text style={styles.titleText}>Skills Needed:</Text>
                <Text style={styles.skillsText}>{newProject.skills}</Text>
              </View>
              <View style={styles.interestedView}>
                <Text style={styles.titleText}>Users Interested:</Text>
                <View style={styles.flatlist}>
                  <FlatList
                    data={projectInterests}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                      <Interested
                        name={itemData.item.userName}
                        message={itemData.item.userMessage}
                        status={itemData.item.status}
                        onSelect={() => {
                          props.navigation.navigate({
                            routeName: "ViewProfile",
                            params: { profileId: itemData.item.userId },
                          });
                        }}
                        onDecide={() => {
                          interstDecision(itemData.item.id);
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styles.start}>
                <MyButton
                  onPress={() => {
                    console.log("newProject:", newProject);
                    startProject(
                      newProject.id,
                      newProject.title,
                      newProject.description,
                      newProject.author,
                      members
                    );
                  }}
                  title="Start Project"
                />
              </View>
              <View style={styles.creditsView}>
                <Text style={styles.nameText}>
                  Posted by {newProject.author} on {newProject.readableDate}
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
};

UserNewProjectScreen.navigationOptions = (navData) => {
  const projectTitle = navData.navigation.getParam("projectTitle");
  const project = navData.navigation.getParam("projectInfo");
  return {
    headerTitle: projectTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit Project"
          iconName={"ios-create"}
          iconSize={32}
          onPress={() => {
            navData.navigation.navigate({
              routeName: "editProject",
              params: {
                newProject: project,
              },
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    // alignItems: "center",
  },
  cardView: {
    //height: "95%",
    width: "95%",
    margin: 10,
    padding: 5,
  },
  creditsView: {
    flex: 1,
    marginTop: 10,
    //justifyContent: "flex-end",
    //justifyContent: "flex-start",
    height: "15%",
  },
  //   buttonView: {
  //     margin: 10,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  skillsView: {
    // marginVertical: 10,
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlist: {
    height: "100%",
  },
  interestedView: {
    flex: 1,
    height: "50%",
  },
  start: {
    alignItems: "center",
    justifyContent: "center",
    // height: "10%",
  },
  decsText: {
    fontFamily: "pt-sans",
    fontSize: 15,
  },
  skillsText: {
    fontFamily: "pt-sans",
    fontSize: 15,
  },
  skillView: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 6,
    padding: 1,
  },
});

export default UserNewProjectScreen;
