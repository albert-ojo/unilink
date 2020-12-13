import moment from "moment";

class NewCurrentProject {
  constructor(
    id,
    newProjectId,
    title,
    description,
    author,
    authorId,
    date,
    members
  ) {
    this.id = id;
    this.newProjectId = newProjectId;
    this.title = title;
    this.description = description;
    this.author = author;
    this.authorId = authorId;
    this.date = date;
    this.members = members;
  }
  get readableDate() {
    /*return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });*/

    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default NewCurrentProject;

/*
// export const createNewProject = (title, description, skills, author) => {
//     return async (dispatch, getState) => {
//       const token = getState().auth.token;
//       const userId = getState().auth.userId;
//       const date = new Date();
//       // any async code you want
//       const response = await fetch(
//         `https://unilink-65d71.firebaseio.com/projects.json?auth=${token}`,
//         {
//           method: "POST",
//           header: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title,
//             description,
//             skills,
//             author,
//             date: date.toISOString(),
//             userId,
//           }),
//         }
//       );
//       const resData = await response.json();
  
//       console.log(resData);
  
//       dispatch({
//         type: CREATE_NEW_PROJECT,
//         newProjectData: {
//           id: resData.name,
//           title,
//           description,
//           skills,
//           author,
//           date: date,
//           userId: userId,
//         },
//       });
//     };
//   };



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

  */
