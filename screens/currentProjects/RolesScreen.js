import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList
} from "react-native";
import { SAMPLEROLES } from "../../sampleData/sampleProjects";

const RolesScreen = props => {
  const renderRoles = itemData => {
    return (
      <View style={styles.roleView}>
        <View style={styles.roleTextView}>
          <Text style={styles.roleText}>{itemData.item.role}</Text>
        </View>
        <View style={styles.nameTextView}>
          <Text style={styles.nameText}>{itemData.item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={SAMPLEROLES}
        renderItem={renderRoles}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  roleView: {
    alignItems: "center",
    marginTop: 10
  },
  roleText: {
    fontFamily: "open-sans-bold",
    fontSize: 24
  },
  nameText: {
    fontFamily: "open-sans",
    fontSize: 18
  }
});

export default RolesScreen;
