import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "./Card";
import Icon from "react-native-vector-icons/FontAwesome";

const UserInterestsLit = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log("This is go to user id:", props.profileId);
  let statusColor;
  if (props.status == "Accepted") {
    statusColor = "green";
  } else if (props.status == "Denied") {
    statusColor = "red";
  } else {
    statusColor = "grey";
  }
  return (
    <Card style={styles.orderItem}>
      <View style={styles.topView}>
        <View style={styles.summary}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={{ fontFamily: "open-sans-bold", color: statusColor }}>
            {props.status}
          </Text>
        </View>
        <View></View>
        <View>
          <Icon
            name="close"
            size={20}
            color="grey"
            onPress={props.onInterest}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonStyle}>
          <Button
            color="#708090"
            title={"View Owner Profile"}
            onPress={props.onSelect}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            color="#C0C0C0"
            title={showDetails ? "Hide Message" : "Show Message"}
            onPress={() => {
              setShowDetails((prevState) => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.detailItems}>
          <Text style={styles.messageText}>{props.message}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    // flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems: "center",
    // width: "100%",
    // marginBottom: 15,
  },

  detailItems: {
    width: "80%",
    marginTop: 8,
  },
  buttonView: {},
  nameText: {
    fontFamily: "open-sans-bold",
  },
  buttonStyle: {
    marginHorizontal: 5,
  },
  topView: {
    flexDirection: "row",
    marginHorizontal: 8,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
});

export default UserInterestsLit;
