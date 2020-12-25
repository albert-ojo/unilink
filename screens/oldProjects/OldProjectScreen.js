import React from "react";
import { Text, View, StyleSheet } from "react-native";

const OldProjectScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Old Project Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OldProjectScreen;
