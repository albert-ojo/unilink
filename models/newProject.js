import moment from "moment";

class NewProject {
  constructor(id, title, description, skills, author, date, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.author = author;
    this.date = date;
    this.userId = userId;
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

export default NewProject;
