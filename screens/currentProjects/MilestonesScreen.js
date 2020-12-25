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
import MilestoneName from "../../components/MilestoneName";
import { setCheck } from "../../store/actions/checked";

const MilestonesScreen = (props) => {
  const stageCheck = useSelector((state) => state.check.check);
  console.log("This is STAGE CHECK", stageCheck);
  const [checked, setChecked] = useState(false);
  const check = useSelector((state) => state.check.check);
  const dispatch = useDispatch();
  const changeCheck = useCallback(() => {
    dispatch(setCheck());
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleCheck: changeCheck });
  }, [changeCheck]);

  const toDoDoneList = useSelector((state) => state.check.doneList);

  const renderMilestone = (itemData) => {
    //console.log("Render Milestones:", itemData.item.name);
    // console.log(
    //   "This is the length of milestones array",
    //   SAMPLEMILESTONES.length
    // );

    const mileStonesLength = SAMPLEMILESTONES.length;

    const toggleCheck = props.navigation.getParam("toggleCheck");
    const isToDoDone = toDoDoneList.some((gr) => gr.id === itemData.item.id);
    return (
      <View>
        <View style={styles.checkedView}>
          <View style={styles.textView}>
            <MilestoneName
              onSelect={() => {
                props.navigation.navigate({
                  routeName: "UserMilestones",
                  params: {
                    milestoneId: itemData.item.id,
                    milestoneUser: itemData.item.name,
                    milestonelength: mileStonesLength,
                  },
                });
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.nameText}>{itemData.item.name}</Text>
              </View>
            </MilestoneName>
          </View>
          <View style={styles.checkView}>
            <CheckBox
              title="Done"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isToDoDone}
              iconRight={true}
              containerStyle={styles.checkedStyle}
              onPress={() => {}}
            />
          </View>
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
        data={SAMPLEMILESTONES}
        keyExtractor={(item) => item.id}
        renderItem={renderMilestone}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  checkedStyle: {
    borderColor: "grey",
    borderRadius: 15,
  },
  checkedView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 10,
    flex: 1,
  },
  checkView: {
    alignItems: "flex-end",
    flex: 1,
  },
  textView: {
    alignItems: "flex-start",
  },
  nameText: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    textAlign: "center",
  },
});

MilestonesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Milestones",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Milestones"
          iconName={"ios-add"}
          iconSize={32}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

{
  /*  */
}

export default MilestonesScreen;
