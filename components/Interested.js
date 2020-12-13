import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Card from "./Card";

const Interested = (props) => {
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
      <View style={styles.summary}>
        <View style={styles.topBox}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={{ color: statusColor, fontFamily: "open-sans-bold" }}>
            {props.status}
          </Text>
        </View>
        <View style={styles.btnView}>
          <Button title="Decide" onPress={props.onDecide} color="dimgray" />
        </View>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonStyle}>
          <Button
            color="#708090"
            title={"View Profile"}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  detailItems: {
    width: "80%",
    marginTop: 8,
  },
  buttonView: {
    flexDirection: "row",
  },
  nameText: {
    fontFamily: "open-sans-bold",
  },
  buttonStyle: {
    marginHorizontal: 5,
  },
  btnView: {},
});

export default Interested;
