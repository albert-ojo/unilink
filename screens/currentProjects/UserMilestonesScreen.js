import React, { useEffect, useState, useCallback } from "react";
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
import CurrentProjectList from "../../components/CurrentProjectList";
import {
  SAMPLEPROJECTS,
  SAMPLEROLES,
  SAMPLEMILESTONES,
} from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import TouchableCard from "../../components/TouchableCard";
import TouchableComponent from "../../components/TouchableComponent";
import { CheckBox } from "react-native-elements";
import { setCheck, setCheckCount } from "../../store/actions/checked";

const UserMilestonesScreen = (props) => {
  const dispatch = useDispatch();
  const UserId = props.navigation.getParam("milestoneId");
  const UserMilestoneData = SAMPLEMILESTONES.find((gr) => gr.id === UserId);
  const UserRoleData = SAMPLEROLES.find(
    (gr) => gr.userId === UserMilestoneData.userId
  );
  //console.log("User Milestone Data is:", UserMilestoneData);
  //console.log("User Role Data is:", UserRoleData);

  const changeCheck = useCallback(() => {
    dispatch(setCheck(UserId));
    dispatch(setCheckCount());
  }, [dispatch, UserId]);

  useEffect(() => {
    props.navigation.setParams({ toggleCheck: changeCheck });
  }, [changeCheck]);

  const toDoDoneList = useSelector((state) => state.check.doneList);

  const isToDoDone = toDoDoneList.some((gr) => gr.id === UserMilestoneData.id);

  //console.log("These are the jobs that are done", toDoDoneList);
  //console.log("Status of check", isToDoDone);

  return (
    <ImageBackground
      source={require("../../assets/images/floor.png")}
      style={styles.background}
    >
      <View>
        <Card style={styles.cardView}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{UserRoleData.name}</Text>
          </View>
          <View style={styles.roleView}>
            <Text style={styles.roleText}>{UserRoleData.role}</Text>
          </View>
          <View style={styles.toDoView}>
            <Text style={styles.toDoText}>To Do:</Text>
            <Text>{UserMilestoneData.description}</Text>
          </View>
          <View style={styles.checkView}>
            <CheckBox
              title="Done"
              containerStyle={styles.checkBoxStyle}
              checked={isToDoDone}
              onPress={changeCheck}
            />
          </View>
          <View>
            <Text style={styles.doneByText}>
              To be done by: {UserMilestoneData.dueDate}
            </Text>
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  cardView: {
    margin: 10,
    height: "95%",
    padding: 10,
  },
  nameText: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
  },
  roleText: {
    fontFamily: "open-sans-bold",
    color: "grey",
    fontSize: 18,
  },
  roleView: {
    marginBottom: 15,
  },
  toDoText: {
    fontFamily: "open-sans-bold",
  },
  toDoView: {
    marginBottom: 15,
  },
  checkView: {
    marginBottom: 15,
    //width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  doneByText: {
    fontFamily: "open-sans-bold",
  },
  checkBoxStyle: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 15,
  },
});

UserMilestonesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Milestones",
  };
};

export default UserMilestonesScreen;
