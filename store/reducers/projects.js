import {
  SET_NEW_PROJECTS,
  CREATE_NEW_PROJECT,
  SET_INTEREST,
  SHOW_INTEREST,
  UPDATE_NEW_PRODUCT,
  ACCEPT_INTEREST,
  DELETE_NEW_PROJECT,
  DELETE_INTEREST,
  MOVE_TO_CURRENT_PROJECT,
  SET_CURRENT_PROJECTS,
} from "../actions/projects";
import NewProject from "../../models/newProject";
import NewInterest from "../../models/newInterest";
import NewCurrentProject from "../../models/currentProject/newCurrentProject";

const initailState = {
  avaliableProjects: [],
  userNewProjects: [],
  userInterests: [],
  ownerInterests: [],
  currentProjects: [],
};

export default (state = initailState, action) => {
  switch (action.type) {
    case MOVE_TO_CURRENT_PROJECT:
      const newCurrentProject = new NewCurrentProject(
        action.newProjectData.id,
        action.newProjectData.newProjectId,
        action.newProjectData.title,
        action.newProjectData.description,
        action.newProjectData.author,
        action.newProjectData.authorId,
        action.newProjectData.date,
        action.newProjectData.members
      );
      return {
        ...state,
        currentProjects: state.currentProjects.concat(newCurrentProject),
      };
    case DELETE_NEW_PROJECT:
      return {
        ...state,
        userNewProjects: state.userNewProjects.filter(
          (product) => product.id !== action.pid
        ),
        avaliableProjects: state.avaliableProjects.filter(
          (product) => product.id !== action.pid
        ),
      };
    case DELETE_INTEREST:
      return {
        userInterests: state.userInterests.filter(
          (int) => int.id !== action.pid
        ),
        ownerInterests: state.ownerInterests.filter(
          (int) => int.id !== action.pid
        ),
      };
    case ACCEPT_INTEREST:
      const interestIndex = state.userInterests.findIndex(
        (prod) => prod.id === action.pid
      );

      const updateUserInterest = new NewInterest(
        action.pid,
        state.userInterests[interestIndex].userName,
        state.userInterests[interestIndex].projectName,
        state.userInterests[interestIndex].userMessage,
        state.userInterests[interestIndex].userId,
        state.userInterests[interestIndex].projectId,
        state.userInterests[interestIndex].postedUserId,
        action.interestData.decision
      );
      const updatedUserInterests = [...state.userInterests];
      updatedUserInterests[interestIndex] = updateUserInterest;
      const interestOwnerIndex = state.ownerInterests.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedOwnerInterests = [...state.ownerInterests];
      updatedOwnerInterests[interestOwnerIndex] = updateUserInterest;

      return {
        ...state,
        userInterests: updatedUserInterests,
        ownerInterests: updatedOwnerInterests,
      };
    case SHOW_INTEREST:
      const newInterest = new NewInterest(
        action.interestData.id,
        action.interestData.userName,
        action.interestData.projectName,
        action.interestData.userMessage,
        action.interestData.userId,
        action.interestData.projectId,
        action.interestData.postedUserId,
        action.interestData.status
      );
      return {
        ...state,
        userInterests: state.userInterests.concat(newInterest),
      };
    case SET_INTEREST:
      return {
        ...state,
        userInterests: action.userInterests,
        ownerInterests: action.ownerInterests,
      };
    case SET_NEW_PROJECTS:
      return {
        ...state,
        avaliableProjects: action.newProjects,
        userNewProjects: action.userNewProjects,
      };
    case SET_CURRENT_PROJECTS:
      return {
        ...state,
        currentProjects: action.newCurrentProjects,
      };
    case CREATE_NEW_PROJECT:
      const newProject = new NewProject(
        action.projectData.id,
        action.projectData.title,
        action.projectData.description,
        action.projectData.skills,
        action.projectData.author,
        action.projectData.date,
        action.projectData.userId
      );
      return {
        ...state,
        avaliableProjects: state.avaliableProjects.concat(newProject),
        userNewProjects: state.userNewProjects.concat(newProject),
      };
    case UPDATE_NEW_PRODUCT:
      const projectIndex = state.userNewProjects.findIndex(
        (prod) => prod.id === action.pid
      );

      const updateNewProject = new NewProject(
        action.pid,
        action.projectData.title,
        action.projectData.description,
        action.projectData.skills,
        action.projectData.author,
        state.userNewProjects[projectIndex].date,
        state.userNewProjects[projectIndex].userId
      );
      const updatedNewProjects = [...state.userNewProjects];
      updatedNewProjects[projectIndex] = updateNewProject;
      const avaliableNewProjectIndex = state.avaliableProjects.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvaliableNewProjects = [...state.avaliableProjects];
      updatedAvaliableNewProjects[avaliableNewProjectIndex] = updateNewProject;
      return {
        ...state,
        avaliableProjects: updatedAvaliableNewProjects,
        userNewProjects: updatedNewProjects,
      };
  }
  return state;
};

/*
export const setNewProjects = () => {
  return async (dispatch, getState) => {
    // any async code you want
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://unilink-65d71.firebaseio.com/projects.json"
      );

      if (!response.ok) {
        throw new Error("Somethng went wrong!");
      }
      const resData = await response.json();
      const loadedProjects = [];
      for (const key in resData) {
        loadedProjects.push(
          new NewProject(
            key,
            resData[key].title,
            resData[key].description,
            resData[key].skills,
            resData[key].author,
            new Date(resData[key].date),
            resData[key].userId
          )
        );
      }
      console.log("LOADED PROJECTS:", loadedProjects);
      dispatch({
        type: SET_NEW_PROJECTS,
        newProjects: loadedProjects,
        userNewProjects: loadedProjects.filter((prod) => prod.userId == userId),
      });
    } catch (err) {
      //send to custom analytics center
      throw err;
    }
  };
};
*/
