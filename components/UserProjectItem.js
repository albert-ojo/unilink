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
} from "react-native";
import Card from "./Card";
import Icon from "react-native-vector-icons/FontAwesome";

const UserProjectItem = (props) => {
  let TouchablCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchablCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.project}>
      <View style={styles.touchable}>
        <TouchablCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.topView}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{props.title}</Text>
              </View>
              <Icon
                name="close"
                size={20}
                color="red"
                onPress={props.iconPress}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.textText}>Description: </Text>
              <Text style={styles.descriptionText}>{props.description}</Text>
            </View>
            <View style={styles.skills}>
              <Text style={styles.textText}>Skills needed: </Text>
              <View style={{ flexDirection: "row" }}>
                {props.skills &&
                  props.skills.map((skill) => {
                    return (
                      <View style={styles.skillView}>
                        <Text>{skill} </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            <View style={styles.author}>
              <Text style={styles.authorText}>Posted by: {props.author}</Text>
            </View>
          </View>
        </TouchablCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    flex: 1,
    height: 300,
    margin: 20,
    width: "90%",
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  title: {
    height: "15%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    height: "47%",
    margin: 3,
    width: "100%",
  },
  skills: {
    height: "30%",
    padding: 3,

    marginHorizontal: 3,
  },
  author: {
    height: "5%",
    padding: 3,
  },
  titleText: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
  },
  descriptionText: {
    fontSize: 14,
  },
  skillsText: {
    fontSize: 15,
  },
  authorText: {
    fontSize: 10,
  },
  textView: {
    flexDirection: "row",
    width: "75%",
  },
  textText: {
    fontFamily: "open-sans-bold",
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skillView: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 6,
    padding: 1,
  },
});

export default UserProjectItem;
