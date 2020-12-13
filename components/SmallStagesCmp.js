import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ScrollView,
} from "react-native";
import Card from "./Card";
import { useSelector } from "react-redux";

const SmallStagesCmp = (props) => {
  const stageCheck = useSelector((state) => state.check.check);
  console.log("This is STAGE CHECK", stageCheck);
  let TouchablCmp = TouchableOpacity;
  let bckColor = "white";
  if (stageCheck == true) {
    bckColor = "black";
  }

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchablCmp = TouchableNativeFeedback;
  }
  return (
    <Card
      style={{
        height: 30,
        margin: 8,
        width: "90%",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "black",
        backgroundColor: bckColor,
        alignItems: "center",
        flex: 1,
      }}
    >
      <View style={styles.touchable}>
        <TouchablCmp onPress={props.onSelect} useForeground>
          <View style={styles.cmpView}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
        </TouchablCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 12,
    margin: 5,
    //width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 5,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    color: "black",
  },
  cmpView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SmallStagesCmp;
