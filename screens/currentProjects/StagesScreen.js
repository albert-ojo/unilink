import React, { useEffect, useState } from "react";
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
import {
  SAMPLEPROJECTS,
  SAMPLEROLES,
  SAMPLESTAGES,
} from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import TouchableCard from "../../components/TouchableCard";
import TouchableComponent from "../../components/TouchableComponent";
import StageComponent from "../../components/StageComponent";

const StagesScreen = (props) => {
  const stageCheck = useSelector((state) => state.check.check);
  console.log("This is STAGE CHECK", stageCheck);
  const renderStage = (itemData) => {
    return (
      <View>
        <StageComponent
          title={itemData.item.skill}
          onSelect={() => {
            props.navigation.navigate({ routeName: "Milestones" });
          }}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <FlatList
        data={SAMPLESTAGES}
        keyExtractor={(item, index) => item.id}
        renderItem={renderStage}
      />
      <View style={styles.buttonView}>
        <Button title="Finish" color="black" />
      </View>
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
  buttonView: {
    margin: 15,
    marginBottom: 30,
    //justifyContent: "center",
    alignItems: "center",
  },
});

StagesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Stages",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Stages"
          iconName={"ios-add"}
          iconSize={32}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

export default StagesScreen;
