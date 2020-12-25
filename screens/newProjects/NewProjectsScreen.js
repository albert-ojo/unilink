import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProjectItem from "../../components/ProjectItem";
import { SAMPLEPROJECTS, SAMPLESKILLS } from "../../sampleData/sampleProjects";
import { fetchProfile } from "../../store/actions/profile";
import { setNewProjects, showInterest } from "../../store/actions/projects";

const NewProjectsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const fetchProfiles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProfile());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      fetchProfiles
    );
    return () => {
      willFocusSub.remove();
    };
  }, [fetchProfiles]);

  useEffect(() => {
    setIsLoading(true);
    fetchProfiles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, fetchProfiles]);

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

  const newProjectsList = useSelector(
    (state) => state.project.avaliableProjects
  );

  ///////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////

  const renderInfo = (itemData) => {
    return (
      <ProjectItem
        title={itemData.item.title}
        description={itemData.item.description}
        skills={itemData.item.skills}
        author={itemData.item.author}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "NewProject",
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

NewProjectsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "New Projects",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewProjectsScreen;
