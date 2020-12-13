import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Card from "./Card";

const TouchableComponent = props => {
  let TouchablCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchablCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.project}>
      <View style={styles.touchable}>
        <TouchablCmp onPress={props.onSelect} useForeground>
          <View>{props.children}</View>
        </TouchablCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 170,
    margin: 20,
    width: "90%"
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
    flex: 1,
    height: "100%",
    width: "100%"
  },
  title: {
    height: "100%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    height: "47%",
    padding: 3
  },
  skills: {
    height: "30%",
    padding: 3
  },
  author: {
    height: "5%",
    padding: 3
  },
  titleText: {
    fontSize: 22,
    fontFamily: "open-sans-bold"
  },
  descriptionText: {
    fontSize: 14
  },
  skillsText: {
    fontSize: 15
  },
  authorText: {
    fontSize: 10
  }
});

export default TouchableComponent;
