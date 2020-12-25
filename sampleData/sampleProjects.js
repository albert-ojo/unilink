import NewProject from "../models/newProject";
import NewProfile from "../models/newProfile";
import NewRole from "../models/newRole";
import NewSkills from "../models/newSkills";
import NewMilestone from "../models/newMilestone";

export const SAMPLEPROJECTS = [
  new NewProject(
    "1",
    "Lendit",
    "Lendit is a lending and borrownig platform iuuigbiybioyvfcuyvhgd ugyub ygh hygj ygf yvty ugvhilyub ivby u ybo h o8y ",
    "Law, Accounting, Marketing, Web Development, Electrical Engineering",
    "Albert Ojo-Aromokudu",
    "30/03/2020"
  ),
  new NewProject(
    "2",
    "Mobile Solar",
    "Mobile ",
    "Law, Accunting, Marketing",
    "Albert Ojo-Aromokudu",
    "30/03/2020"
  ),
];

export const SAMPLESKILLS = [
  new NewSkills("a", "Law"),
  new NewSkills("b", "Accounting"),
  new NewSkills("c", "Marketing"),
  new NewSkills("d", "Web Development"),
  new NewSkills("e", "Electrical Engineering"),
];

export const SAMPLEPROFILE = [
  new NewProfile(
    "3",
    "Albert Ojo-Aromokudu",
    "UCT",
    "Mechatronics",
    "5th",
    "Website and App development",
    require("../assets/images/AlbertProfile.jpg"),
    "ojoaromokudu@gmail.com",
    "0766251132",
    "ID1"
  ),
];

export const SAMPLEROLES = [
  new NewRole("4", "Project Manager", "Albert Ojo-Aromokudu", "ID1"),
  new NewRole("5", "Accountant", "Mvuyisi Kene", "ID2"),
  new NewRole("6", "Lawyer", "Tanaka Dhlomo", "ID4"),
  new NewRole("7", "Marketing Agent", "Kevin Sibande", "ID3"),
];

export const SAMPLEMILESTONES = [
  new NewMilestone(
    "a1",
    "Albert Ojo-Aromokudu",
    false,
    "ID1",
    "1",
    "Manage the project and make sure everyone has there jobs done.",
    "10/04/2020"
  ),
  new NewMilestone(
    "a2",
    "Mvuyisi Kene",
    false,
    "ID2",
    "1",
    "Research how much the project will cost. byiniomad djnjicu edphwucnew undpuiwnecp 9ujpcewiwcmec ujepiodjdw. uheounc",
    "10/04/2020"
  ),
  new NewMilestone(
    "a5",
    "Kevin Sibande",
    false,
    "ID3",
    "1",
    "Look for possible marketing opportunities.",
    "10/04/2020"
  ),
  new NewMilestone(
    "a6",
    "Tanaka Dhlomo",
    false,
    "ID4",
    "1",
    "Look for laws that we need to watch out for.",
    "10/04/2020"
  ),
];

export const SAMPLESTAGES = [
  new NewSkills("101", "1"),
  new NewSkills("102", "2"),
  new NewSkills("103", "3"),
  new NewSkills("104", "4"),
  new NewSkills("105", "5"),
  new NewSkills("106", "6"),
  new NewSkills("107", "7"),
  new NewSkills("108", "8"),
  new NewSkills("109", "9"),
];
