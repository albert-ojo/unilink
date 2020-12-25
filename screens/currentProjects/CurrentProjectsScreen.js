import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CurrentProjectList from "../../components/CurrentProjectList";
import { SAMPLEPROJECTS } from "../../sampleData/sampleProjects";
import { setCurrentProjects } from "../../store/actions/projects";

const CurrentProjectsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadCurrentProjects = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(setCurrentProjects());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCurrentProjects
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadCurrentProjects]);

  useEffect(() => {
    setIsLoading(true);
    loadCurrentProjects().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCurrentProjects]);

  const newProjectsList = useSelector((state) => state.project.currentProjects);

  //const userCurrentProjects =

  const renderItem = (itemData) => {
    return (
      <CurrentProjectList
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CurrentProject",
            params: { currentProject: itemData.item },
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again" onPress={loadCurrentProjects} color="grey" />
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

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <FlatList
        data={newProjectsList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </ImageBackground>
  );
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

CurrentProjectsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Current Projects",
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
  };
};

export default CurrentProjectsScreen;
