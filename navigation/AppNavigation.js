import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { useDispatch } from "react-redux";

import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import PortfolioScreen from "../screens/portfolio/PortfolioScreen";
import NewProjectScreen from "../screens/newProjects/NewProjectScreen";
import NewProjectsScreen from "../screens/newProjects/NewProjectsScreen";
import OldProjectScreen from "../screens/oldProjects/OldProjectScreen";
import OldProjectsScreen from "../screens/oldProjects/OldProjectsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import CurrentProjectScreen from "../screens/currentProjects/CurrentProjectScreen";
import CurrentProjectsScreen from "../screens/currentProjects/CurrentProjectsScreen";
import MileStonesScreen from "../screens/currentProjects/MilestonesScreen";
import ProjectDetailsScreen from "../screens/currentProjects/ProjectDetailsScreen";
import RolesScreen from "../screens/currentProjects/RolesScreen";
import SupportScreen from "../screens/support/SupportScreen";
import CreateProjectScreen from "../screens/newProjects/CreateProjectScreen";
import StagesScreen from "../screens/currentProjects/StagesScreen";
import UserMilestonesScreen from "../screens/currentProjects/UserMilestonesScreen";
import * as authActions from "../store/actions/auth";
import CreateProfileScreen from "../screens/profile/CreateProfileScreen";
import NewProjectsTabNavigator from "./NewProjectsTabNavigator";

// const defaultStackNavOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS ===
//   }
// }

const NewProjectsNavigator = createStackNavigator(
  {
    NewProjects: NewProjectsTabNavigator,
  },
  {
    navigationOptions: {
      title: "New Projects",
    },
    defaultNavigationOptions: { headerShown: false },
  }
);

const OldProjectsNavigator = createStackNavigator(
  {
    OldProjects: OldProjectsScreen,
    OldProject: OldProjectScreen,
  },
  {
    navigationOptions: {
      title: "Old Projects",
    },
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
  },
  {
    navigationOptions: {
      title: "My Profile",
    },
  }
);

const CreateProfileNavigator = createStackNavigator({
  CreateProfile: CreateProfileScreen,
});

const CurrentProjectsNavigator = createStackNavigator(
  {
    CurrentProjects: CurrentProjectsScreen,
    CurrentProject: CurrentProjectScreen,
    Milestones: MileStonesScreen,
    ProjectDetails: ProjectDetailsScreen,
    Roles: RolesScreen,
    Stages: StagesScreen,
    UserMilestones: UserMilestonesScreen,
  },
  {
    navigationOptions: {
      title: "Current Projects",
    },
  }
);

const SupportNavigator = createStackNavigator(
  {
    Support: SupportScreen,
  },
  {
    navigationOptions: {
      title: "Support",
    },
  }
);

const PortfolioNavigator = createStackNavigator(
  {
    Portfolio: PortfolioScreen,
  },
  {
    navigationOptions: {
      title: "Portfolio",
    },
  }
);

const AppNavigator = createDrawerNavigator(
  {
    New: NewProjectsNavigator,
    Old: OldProjectsNavigator,
    Current: CurrentProjectsNavigator,
    Portfolio: PortfolioNavigator,
    Profile: ProfileNavigator,
    Support: SupportNavigator,
  },
  {
    contentOptions: {
      activeTintColor: "grey",
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color="black"
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  }
  // {
  //   defaultNavigationOptions: defaultNavOptions
  // }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartScreen,
  Auth: AuthScreen,
  App: AppNavigator,
  SignUp: CreateProfileNavigator,
});

export default createAppContainer(MainNavigator);
