import React, { useEffect, useState } from "react";
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
import CurrentProjectList from "../../components/CurrentProjectList";
import {
  SAMPLEPROJECTS,
  SAMPLEROLES,
  SAMPLESTAGES,
} from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import TouchableCard from "../../components/TouchableCard";
import TouchableComponent from "../../components/TouchableComponent";
import SmallStagesCmp from "../../components/SmallStagesCmp";

const CurrentProjectScreen = (props) => {
  const currentProject = props.navigation.getParam("currentProject");
  console.log("This is currentProject", currentProject);

  const renderRoles = (itemData) => {
    return (
      <View style={styles.rolesView}>
        <View style={styles.roleTextView}>
          <Text style={styles.roleText}>{itemData.item.role}</Text>
        </View>

        <View style={styles.nameTextView}>
          <Text style={styles.nameText}>{itemData.item.name}</Text>
        </View>
      </View>
    );
  };

  const renderStage = (itemData) => {
    return (
      <SmallStagesCmp
        title={itemData.item.skill}
        onSelect={() => {
          props.navigation.navigate({ routeName: "Stages" });
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <View style={styles.screen}>
        <View style={styles.cardView}>
          <TouchableCard
            title={currentProject.title}
            style={styles.card}
            onSelect={() => {
              props.navigation.navigate({
                routeName: "ProjectDetails",
              });
            }}
          />
        </View>
        <View>
          <TouchableComponent
            onSelect={() => {
              props.navigation.navigate({
                routeName: "Stages",
              });
            }}
          >
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Stages</Text>
            </View>
            <View style={styles.stagesView}>
              <FlatList
                data={SAMPLESTAGES}
                keyExtractor={(item, index) => item.id}
                renderItem={renderStage}
              />
            </View>
          </TouchableComponent>
        </View>
        <View>
          <TouchableComponent
            onSelect={() => {
              props.navigation.navigate({
                routeName: "Roles",
              });
            }}
          >
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Roles</Text>
            </View>
            <View>
              <FlatList
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "space-between",
                  //alignItems: "flex-end"
                }}
                keyExtractor={(item, index) => item.id}
                data={SAMPLEROLES}
                renderItem={renderRoles}
                //numColumns={2}
                initialNumToRender={6}
              />
            </View>
          </TouchableComponent>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  cardView: {},
  titleView: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 12,
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  roleText: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
  nameText: {
    color: "grey",
    fontFamily: "open-sans",
  },
  rolesView: {
    marginVertical: 3,
    marginHorizontal: 5,
    alignItems: "baseline",
    flexDirection: "row",
  },
  roleTextView: {
    alignItems: "flex-start",
  },
  nameTextView: {
    alignItems: "flex-end",
    flex: 1,
  },
  stagesView: {},
});

CurrentProjectScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Current Project",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit Current Project"
          iconName={"ios-albums"}
          iconSize={23}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

export default CurrentProjectScreen;
