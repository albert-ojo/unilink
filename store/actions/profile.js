import NewProfile from "../../models/newProfile";

export const CREATE_PROFILE = "CREATE_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SET_PROFILE = "SET_PROFILE";

export const createProfile = (
  fullName,
  university,
  degree,
  yearOfStudy,
  otherSkills,
  cellNo,
  email
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log("This is User ID", userId);
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/profiles.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          university,
          degree,
          yearOfStudy,
          otherSkills,
          cellNo,
          email,
          ownerId: userId,
        }),
      }
    );
    const resData = await response.json();
    console.log("This is resData", resData);
    dispatch({
      type: CREATE_PROFILE,
      profileData: {
        id: resData.name,
        fullName,
        university,
        degree,
        yearOfStudy,
        otherSkills,
        cellNo,
        email,
        ownerId: userId,
      },
    });
  };
};

export const updateProfile = (
  id,
  fullName,
  university,
  degree,
  yearOfStudy,
  otherSkills,
  cellNo,
  email
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          university,
          degree,
          yearOfStudy,
          otherSkills,
          cellNo,
          email,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PROFILE,
      pid: id,
      profileData: {
        fullName,
        university,
        degree,
        yearOfStudy,
        otherSkills,
        cellNo,
        email,
      },
    });
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://unilink-65d71.firebaseio.com/profiles.json"
      );
      if (!response.ok) {
        throw new Error("Somethng went wrong!");
      }
      const resData = await response.json();
      console.log("FECTHPROFILE !!! This is resData", resData);
      const loadedProfiles = [];
      for (const key in resData) {
        loadedProfiles.push(
          new NewProfile(
            key,
            resData[key].fullName,
            resData[key].university,
            resData[key].degree,
            resData[key].yearOfStudy,
            resData[key].otherSkills,
            resData[key].picture,
            resData[key].email,
            resData[key].cellNo,
            resData[key].ownerId
          )
        );
      }
      //console.log("This is loaded Profiles", loadedProfiles);
      console.log("This is user id:", userId);
      dispatch({
        type: SET_PROFILE,
        profiles: loadedProfiles,
        userProfile: loadedProfiles.find((prod) => prod.userId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};
