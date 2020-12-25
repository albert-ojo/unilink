import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProjectItem from "../../components/ProjectItem";
import { SAMPLEPROJECTS, SAMPLESKILLS } from "../../sampleData/sampleProjects";
import { fetchProfile } from "../../store/actions/profile";
import {
  setNewProjects,
  deleteProject,
  deleteInterest,
} from "../../store/actions/projects";
import Icon from "react-native-vector-icons/FontAwesome";
import UserProjectItem from "../../components/UserProjectItem";

const UserNewProjectsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const userInterests = useSelector((state) => state.project.userInterests);
  const ownerInterests = useSelector((state) => state.project.ownerInterests);

  const findDeleteInterest = (projectId) => {
    (deleteUserInterests = userInterests.filter(
      (int) => int.projectId == projectId
    )),
      (deleteOwnerInterests = ownerInterests.filter(
        (int) => int.projectId == projectId
      ));
    for (const id in deleteUserInterests) {
      console.log("This is ID for USER delete:", deleteUserInterests[id]);
      dispatch(deleteInterest(deleteUserInterests[id].id));
    }
    for (const id in deleteOwnerInterests) {
      console.log("This is ID for OWNER delete:", deleteOwnerInterests[id]);
      dispatch(deleteInterest(deleteOwnerInterests[id].id));
    }
  };

  const deleteNewProject = (projectId) =>
    Alert.alert(
      "DELETE PROJECT",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(deleteProject(projectId));

            findDeleteInterest(projectId);
          },
        },
      ]
    );

  ///////////////////////////////////////////////////////////////////////////////

  const loadProjects = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(setNewProjects());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProjects
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProjects]);

  useEffect(() => {
    setIsLoading(true);
    loadProjects().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProjects]);

  const newProjectsList = useSelector((state) => state.project.userNewProjects);

  ///////////////////////////////////////////////////////////////////////////////

  const renderInfo = (itemData) => {
    return (
      <UserProjectItem
        title={itemData.item.title}
        description={itemData.item.description}
        skills={itemData.item.skills}
        author={itemData.item.author}
        iconPress={() => {
          deleteNewProject(itemData.item.id);
        }}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "userNewProject",
            params: {
              newProject: itemData.item,
              projectTitle: itemData.item.title,
            },
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again" onPress={fetchProfiles} color="grey" />
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

  // if (!isLoading && myProfile.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>Please Create</Text>
  //     </View>
  //   );
  // }

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <FlatList
        data={newProjectsList}
        keyExtractor={(item) => item.id}
        renderItem={renderInfo}
      />
    </ImageBackground>
  );
};

UserNewProjectsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My New Projects",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"md-menu"}
          iconSize={23}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={"ios-add"}
          iconSize={32}
          onPress={() => {
            navData.navigation.navigate("CreateProject");
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default UserNewProjectsScreen;
