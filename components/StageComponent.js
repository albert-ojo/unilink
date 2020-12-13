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

const StageComponent = (props) => {
  const stageCheck = useSelector((state) => state.check.check);
  console.log("This is STAGE CHECK", stageCheck);
  let TouchablCmp = TouchableOpacity;
  let bckColor = "grey";
  if (stageCheck == true) {
    bckColor = "black";
  }

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchablCmp = TouchableNativeFeedback;
  }
  return (
    <Card
      style={{
        height: 40,
        margin: 20,
        width: "90%",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: bckColor,
      }}
    >
      <ScrollView>
        <View style={styles.touchable}>
          <TouchablCmp onPress={props.onSelect} useForeground>
            <View style={styles.cmpView}>
              <Text style={styles.titleText}>{props.title}</Text>
            </View>
          </TouchablCmp>
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 40,
    margin: 20,
    width: "90%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "white",
  },
  cmpView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StageComponent;
