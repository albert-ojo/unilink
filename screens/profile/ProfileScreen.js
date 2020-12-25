import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { SAMPLEPROFILE } from "../../sampleData/sampleProjects";
import Card from "../../components/Card";
import { fetchProfile } from "../../store/actions/profile";

const ProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myProfile = useSelector((state) => state.profile.userProfile);
  console.log("This is MYPROFILE", myProfile);
  const dispatch = useDispatch();
  const sizeWidth = Dimensions.get("window").width;

  useEffect(() => {
    props.navigation.setParams({ profileInfo: myProfile });
  }, [myProfile]);

  const fetchProfiles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProfile());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      fetchProfiles
    );
    return () => {
      willFocusSub.remove();
    };
  }, [fetchProfiles]);

  useEffect(() => {
    props.navigation.setParams({ profileInfo: myProfile });
    setIsLoading(true);
    fetchProfiles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, fetchProfiles]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again" onPress={fetchProfiles} color="grey" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (!isLoading && myProfile.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Please Create</Text>
      </View>
    );
  } else {
    if (sizeWidth <= 350) {
      return (
        <View style={styles.screen}>
          <ImageBackground
            source={require("../../assets/images/floor.png")}
            style={styles.background}
          >
            <View
              style={{
                marginHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.imageScreenx}>
                <View style={styles.profilePicturex}>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    fadeDuration={1000}
                    source={myProfile.picture}
                  />
                </View>
              </View>
              <Card style={styles.cardView}>
                <View style={styles.infoScreenx}>
                  <View style={styles.name}>
                    <Text style={styles.nameTextx}>{myProfile.name}</Text>
                  </View>
                  <View style={styles.uni}>
                    <Text style={styles.uniTextx}>
                      University: {myProfile.university}
                    </Text>
                    <Text style={styles.degreeTextx}>
                      Dergree of Study: {myProfile.degree}
                    </Text>
                    <Text style={styles.degreeTextx}>
                      Year: {myProfile.year}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={styles.skillsTextx}>
                      Other Skills: {myProfile.skills}
                    </Text>
                  </View>
                </View>
              </Card>
              <View style={styles.contactInfoScreenx}>
                <Text style={styles.emailTextx}>{myProfile.email}</Text>
                <Text style={styles.cellTextx}>{myProfile.cellNo}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.screen}>
          <ImageBackground
            source={require("../../assets/images/floor.png")}
            style={styles.background}
          >
            <View style={{ marginHorizontal: 20 }}>
              <View style={styles.imageScreen}>
                <View style={styles.profilePicture}>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    fadeDuration={1000}
                    source={myProfile.picture}
                  />
                </View>
              </View>
              <Card style={styles.cardView}>
                <View style={styles.infoScreen}>
                  <View style={styles.name}>
                    <Text style={styles.nameText}>{myProfile.name}</Text>
                  </View>
                  <View style={styles.uni}>
                    <Text style={styles.uniText}>
                      University: {myProfile.university}
                    </Text>
                    <Text style={styles.degreeText}>
                      Dergree of Study: {myProfile.degree}
                    </Text>
                    <Text style={styles.degreeText}>
                      Year: {myProfile.year}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={styles.skillsText}>
                      Other Skills: {myProfile.skills}
                    </Text>
                  </View>
                </View>
              </Card>
              <View style={styles.contactInfo}>
                <Text style={styles.emailText}>{myProfile.email}</Text>
                <Text style={styles.cellText}>{myProfile.cellNo}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
};

ProfileScreen.navigationOptions = (navData) => {
  const profileInfo = navData.navigation.getParam("profileInfo");
  return {
    headerTitle: "Profile",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit Profile"
          iconName={"md-cog"}
          iconSize={22}
          onPress={() => {
            navData.navigation.navigate({
              routeName: "EditProfile",
              params: {
                profileInfo: profileInfo,
              },
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    flexDirection: "column",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  profilePicture: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderRadius: 125,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
  },
  profilePicturex: {
    width: 175,
    height: 175,
    borderWidth: 1,
    borderRadius: 87.5,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
  },
  imageScreen: {
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageScreenx: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoScreen: {
    height: "35%",
    marginVertical: 10,
  },
  infoScreenx: {
    height: "45%",
    marginVertical: 10,
  },
  contactInfoScreen: {
    height: "10%",
  },
  contactInfoScreenx: {
    marginTop: 5,
    height: "5%",
  },
  nameText: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    textTransform: "uppercase",
  },
  nameTextx: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  name: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  uni: {
    marginVertical: 2,
  },
  uniText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  uniTextx: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
  degreeText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  emailText: {
    fontFamily: "open-sans",
    fontSize: 13,
  },
  cellText: {
    fontFamily: "open-sans",
    fontSize: 13,
  },
  skillsText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  degreeTextx: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
  emailTextx: {
    fontFamily: "open-sans",
    fontSize: 9,
  },
  cellTextx: {
    fontFamily: "open-sans",
    fontSize: 9,
  },
  skillsTextx: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
  },
  contactInfo: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  cardView: {
    padding: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
