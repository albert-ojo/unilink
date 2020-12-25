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
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CurrentProjectList from "../../components/CurrentProjectList";
import { SAMPLEPROJECTS } from "../../sampleData/sampleProjects";

import Card from "../../components/Card";
import { fetchInterests, deleteInterest } from "../../store/actions/projects";
import Interested from "../../components/Interested";
import UserInterested from "../../components/UserInterested";
import UserInterestsLit from "../../components/UserInterestsLit";

const UserInterestsScreen = (props) => {
  const [apply, setApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const sizeWidth = Dimensions.get("window").width;
  console.log("This is WIDTH:", sizeWidth);

  const deleteUserInterest = (id) =>
    Alert.alert(
      "DELETE",
      "Are you sure you want to delete your interest in this project?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(deleteInterest(id));
          },
        },
      ]
    );

  const loadUserInterests = useCallback(async () => {
    console.log("LOAD INTERESTS FUNCTION!!");
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
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadUserInterests
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadUserInterests]);

  useEffect(() => {
    setIsLoading(true);
    loadUserInterests().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUserInterests]);

  const userInterests = useSelector((state) => state.project.userInterests);
  console.log("These are my INTERESTS", userInterests);

  const renderNormal = (itemData) => {
    if (sizeWidth <= 350) {
      return (
        <UserInterestsLit
          name={itemData.item.projectName}
          message={itemData.item.userMessage}
          status={itemData.item.status}
          onInterest={() => {
            deleteUserInterest(itemData.item.id);
          }}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "ViewOwnerProfile",
              params: { profileId: itemData.item.postedUserId },
            });
          }}
        />
      );
    } else {
      return (
        <UserInterested
          name={itemData.item.projectName}
          message={itemData.item.userMessage}
          status={itemData.item.status}
          onInterest={() => {
            deleteUserInterest(itemData.item.id);
          }}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "ViewOwnerProfile",
              params: { profileId: itemData.item.postedUserId },
            });
          }}
        />
      );
    }
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again" onPress={loadUserInterests} color="grey" />
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
      <Card style={styles.cardView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Applications:</Text>
        </View>
        <FlatList
          data={userInterests}
          keyExtractor={(item) => item.id}
          renderItem={renderNormal}
        />
      </Card>
    </ImageBackground>
  );
};

UserInterestsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Applications",
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
    alignItems: "center",
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  cardView: {
    //height: "95%",
    width: "95%",
    margin: 25,
    padding: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleView: {
    marginBottom: 5,
  },
});

UserInterestsScreen.navigationOptions = (navData) => {
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

export default UserInterestsScreen;
