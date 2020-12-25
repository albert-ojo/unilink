import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProjectItem from "../../components/ProjectItem";
import { SAMPLEPROJECTS } from "../../sampleData/sampleProjects";

const ProjectDetailsScreen = props => {
  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <View style={styles.screen}>
        <Text>Project Details Screen</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

ProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Edit Current Project",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit Description"
          iconName={"ios-add"}
          iconSize={32}
          onPress={() => {}}
        />
      </HeaderButtons>
    )
  };
};

export default ProjectDetailsScreen;
