import NewProject from "../../models/newProject";
import NewInterest from "../../models/newInterest";
import NewCurrentProject from "../../models/currentProject/newCurrentProject";

export const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT";
export const DELETE_NEW_PROJECT = "DELETE_NEW_PROJECT";
export const UPDATE_NEW_PROJECT = "UPDATE_NEW_PROJECT";
export const MOVE_TO_CURRENT_PROJECT = "MOVE_TO_CURRENT_PROJECT";
export const SET_NEW_PROJECTS = "SET_NEW_PROJECTS";

export const SHOW_INTEREST = "SHOW_INTEREST";
export const SET_INTEREST = "SET_INTEREST";
export const ACCEPT_INTEREST = "ACCEPT_INTEREST";
export const DELETE_INTEREST = "DELETE_INTEREST";

export const CREATE_TEAM = "CREATE_TEAM";

export const DELETE_CURRENT_PROJECT = "DELETE_CURRENT_PROJECT";
export const EDIT_CURRENT_PROJECT = "EDIT_CURRENT_PROJECT";
export const FINISH_CURRENT_PROJECT = "FINISH_CURRENT_PROJECT";
export const SET_CURRENT_PROJECTS = "SET_CURRENT_PROJECTS";

export const setCurrentProjects = () => {
  console.log("SETCURRENTPROJECTS");
  return async (dispatch, getState) => {
    // any async code you want
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://unilink-65d71.firebaseio.com/currentProjects.json"
      );

      if (!response.ok) {
        throw new Error("Somethng went wrong!");
      }
      const resData = await response.json();
      const loadedCurrentProjects = [];
      for (const key in resData) {
        loadedCurrentProjects.push(
          new NewCurrentProject(
            key,
            resData[key].newProjectId,
            resData[key].title,
            resData[key].description,
            resData[key].author,
            resData[key].authorId,
            new Date(resData[key].date),
            resData[key].members
          )
        );
      }
      console.log("LOADED CURRENT PROJECTS:", loadedCurrentProjects);
      dispatch({
        type: SET_CURRENT_PROJECTS,
        newCurrentProjects: loadedCurrentProjects,
      });
    } catch (err) {
      //send to custom analytics center
      throw err;
    }
  };
};

export const moveToCurrentProjects = (
  newProjectId,
  title,
  description,
  author,
  members
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    // any async code you want
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/currentProjects.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newProjectId,
          title,
          description,
          author,
          authorId: userId,
          date: date.toISOString(),
          members: members,
        }),
      }
    );
    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: MOVE_TO_CURRENT_PROJECT,
      newProjectData: {
        id: resData.name,
        newProjectId,
        title,
        description,
        author,
        authorId: userId,
        date: date,
        members: members,
      },
    });
  };
};

export const createTeam = (projectId, authorId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    // any async code you want
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/projects.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          skills,
          author,
          date: date.toISOString(),
          userId,
        }),
      }
    );
    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_NEW_PROJECT,
      newProjectData: {
        id: resData.name,
        title,
        description,
        skills,
        author,
        date: date,
        userId: userId,
      },
    });
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteInterest = (interestId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/interests/${interestId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_INTEREST, pid: interestId });
  };
};

export const accpetInterest = (id, decision) => {
  console.log("INTERESTS UPDATE STARTED");
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/interests/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: decision,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: ACCEPT_INTEREST,
      pid: id,
      interestData: {
        decision,
      },
    });
  };
};

export const showInterest = (
  userName,
  projectName,
  userMessage,
  projectId,
  postedUserId,
  decision
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/interests.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          projectName,
          userMessage,
          userId: userId,
          projectId,
          postedUserId,
          status: decision,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: SHOW_INTEREST,
      interestData: {
        id: resData.name,
        userName,
        projectName,
        userMessage,
        userId: userId,
        projectId,
        postedUserId,
        status: decision,
      },
    });
  };
};

export const fetchInterests = () => {
  console.log("FETCHING INTERESTS");
  return async (dispatch, getState) => {
    // any async code you want
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://unilink-65d71.firebaseio.com/interests.json"
      );

      if (!response.ok) {
        throw new Error("Somethng went wrong!");
      }
      const resData = await response.json();
      const loadedInterests = [];
      for (const key in resData) {
        loadedInterests.push(
          new NewInterest(
            key,
            resData[key].userName,
            resData[key].projectName,
            resData[key].userMessage,
            resData[key].userId,
            resData[key].projectId,
            resData[key].postedUserId,
            resData[key].status
          )
        );
      }
      console.log("LOADED INTERESTS", loadedInterests);
      console.log("Posted User ID:", loadedInterests.userId);
      console.log("USER ID", userId);
      dispatch({
        type: SET_INTEREST,
        userInterests: loadedInterests.filter((prod) => prod.userId == userId),
        ownerInterests: loadedInterests.filter(
          (prod) => prod.postedUserId == userId
        ),
      });
    } catch (err) {
      //send to custom analytics center
      throw err;
    }
  };
};

/////////////////////////////////////////////////////////////////////////////////////

export const createNewProject = (title, description, skills, author) => {
  console.log("These are the skills", skills);
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    // any async code you want
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/projects.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          skills,
          author,
          date: date.toISOString(),
          userId,
        }),
      }
    );
    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_NEW_PROJECT,
      newProjectData: {
        id: resData.name,
        title,
        description,
        skills,
        author,
        date: date,
        userId: userId,
      },
    });
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/projects/${projectId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_NEW_PROJECT, pid: projectId });
  };
};

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

export const updateNewProject = (id, title, description, skills, author) => {
  console.log("Updating Project...");
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://unilink-65d71.firebaseio.com/projects/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          skills,
          author,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_NEW_PRODUCT,
      pid: id,
      projectData: {
        title,
        description,
        skills,
        author,
      },
    });
  };
};

export const deleteCurrentProject = () => {};

export const editCurrentProject = () => {};

export const finishCurrentProject = () => {};
