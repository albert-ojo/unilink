import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import NewProjectsScreen from "../screens/newProjects/NewProjectsScreen";
import NewProjectScreen from "../screens/newProjects/NewProjectScreen";
import CreateProjectScreen from "../screens/newProjects/CreateProjectScreen";
import UserNewProjectsScreen from "../screens/newProjects/UserNewProjectsScreen";
import UserNewProjectScreen from "../screens/newProjects/UserNewProjectScreen";
import EditNewProjectScreen from "../screens/newProjects/EditNewProjectScreen";
import UserInterestsScreen from "../screens/newProjects/UserInterestsScreen";
import ViewProfileScreen from "../screens/profile/ViewProfileScreen";

const allNewProjects = createStackNavigator(
  {
    NewProjects: NewProjectsScreen,
    NewProject: NewProjectScreen,
    CreateProject: CreateProjectScreen,
    ViewProfile: ViewProfileScreen,
  },
  {
    navigationOptions: {
      title: "New Projects",
    },
  }
);

const userNewProjects = createStackNavigator(
  {
    userNewProjects: UserNewProjectsScreen,
    userNewProject: UserNewProjectScreen,
    editProject: EditNewProjectScreen,
    ViewProfile: ViewProfileScreen,
  },
  {
    navigationOptions: {
      title: "My New Projects",
    },
  }
);

const userInterests = createStackNavigator(
  {
    usersInterests: UserInterestsScreen,
    ViewOwnerProfile: ViewProfileScreen,
  },
  {
    navigationOptions: {
      title: "My interests",
    },
  }
);

const tabScreenConfig = {
  NewProjects: {
    screen: allNewProjects,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-albums" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "#708090",
      tabBarLabel: "New Projects",
    },
  },
  NewUserProjects: {
    screen: userNewProjects,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-browsers" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "#C0C0C0",
      tabBarLabel: "My Projects",
    },
  },
  NewUserInterests: {
    screen: userInterests,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-bookmarks" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "#C0C0C0",
      tabBarLabel: "My Interests",
    },
  },
};

const NewProjectsTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "grey",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "grey",
        },
      });

NewProjectsTabNavigator.navigationOptions = (navData) => {
  return { headerTitle: "Projects" };
};

export default createAppContainer(NewProjectsTabNavigator);
