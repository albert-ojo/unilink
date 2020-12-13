import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MyButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFAFA",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderColor: "grey",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    margin: 3,
    borderRadius: 16,
  },
  buttonText: {
    color: "#696969",
    fontFamily: "open-sans-bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

export default MyButton;
