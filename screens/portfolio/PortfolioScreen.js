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

const PortfolioScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        <View style={styles.em}>
          <Text style={styles.emText}>Set Emergency Contacts</Text>
        </View>
        <View style={styles.em}>
          <Text style={styles.emText}>Set Emergency Messages</Text>
        </View>
        <View style={styles.alarm}>
          <Text style={styles.aText}>Cancel Alarm</Text>
        </View>
      </View>
    </View>
  );
};

PortfolioScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Mobile Application",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"md-menu"}
          iconSize={23}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box: {
    borderColor: "white",
    borderWidth: 2,
    padding: 20,
    height: "80%",
    width: "80%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  em: {
    borderColor: "grey",
    borderWidth: 4,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 20,
  },
  emText: {
    fontSize: 22,
  },
  alarm: {
    borderWidth: 2,
    padding: 40,
    paddingVertical: 20,
    backgroundColor: "red",
    borderColor: "red",
    borderRadius: 20,
  },
  aText: {
    fontSize: 30,
  },
});

export default PortfolioScreen;
