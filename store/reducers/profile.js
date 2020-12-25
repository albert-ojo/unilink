import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  SET_PROFILE,
} from "../actions/profile";
import NewProfile from "../../models/newProfile";

const initialState = {
  userProfile: [],
  allProfiles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      console.log("NEW PROFILE CEREATED");
      const newProfile = new NewProfile(
        action.profileData.id,
        action.profileData.fullName,
        action.profileData.university,
        action.profileData.degree,
        action.profileData.yearOfStudy,
        action.profileData.otherSkills,
        null,
        action.profileData.email,
        action.profileData.cellNo,
        action.profileData.ownerId
      );
      console.log("New Profile:", newProfile);
      return {
        ...state,
        userProfile: newProfile,
        allProfiles: state.allProfiles.concat(newProfile),
      };
    case UPDATE_PROFILE:
      const profileIndex = state.allProfiles.findIndex(
        (prod) => prod.id === action.pid
      );
      console.log("PROFILE INDEX", profileIndex);
      const updatedProfile = new NewProfile(
        action.pid,
        action.profileData.fullName,
        action.profileData.university,
        action.profileData.degree,
        action.profileData.yearOfStudy,
        action.profileData.otherSkills,
        null,
        action.profileData.email,
        action.profileData.cellNo,
        state.userProfile.userId
      );
      const updateedAllProfiles = [...state.allProfiles];
      updateedAllProfiles[profileIndex] = updatedProfile;
      return {
        ...state,
        userProfile: updatedProfile,
        allProfiles: updateedAllProfiles,
      };
    case SET_PROFILE:
      console.log("This is the logged in user profile", action.userProfile);
      console.log("These are all the profiles", action.profiles);
      return {
        allProfiles: action.profiles,
        userProfile: action.userProfile,
      };
  }
  return state;
};
