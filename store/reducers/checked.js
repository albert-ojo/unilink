import { SET_CHECK, SET_CHECK_COUNT } from "../actions/checked";
import {
  SAMPLEMILESTONES,
  SAMPLESTAGES,
} from "../../sampleData/sampleProjects";

const initialState = {
  check: false,
  doneList: [],
  toDoList: SAMPLEMILESTONES,
  checkCount: 0,
  doneStages: [],
  stages: SAMPLESTAGES,
};

const checkedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECK:
      const count = state.checkCount;
      console.log("This is check count", state.checkCount);
      const existingIndex = state.doneList.findIndex(
        (gr) => gr.id === action.MilestoneId
      );
      if (existingIndex >= 0) {
        const updatedDone = [...state.doneList];
        updatedDone.splice(existingIndex, 1);
        return { ...state, doneList: updatedDone, checkCount: count - 1 };
      } else {
        const checkedMilestone = state.toDoList.find(
          (gr) => gr.id === action.MilestoneId
        );
        return {
          ...state,
          doneList: state.doneList.concat(checkedMilestone),
          checkCount: count + 1,
        };
      }
      console.log("This is check count", state.checkCount);
    case SET_CHECK_COUNT:
      if (state.checkCount == state.toDoList.length) {
        console.log("WORKED!!");
        return { ...state, check: true };
      } else {
        console.log("WORKED BUT FALSE");
        return { ...state, check: false };
      }
  }
  return state;
};

export default checkedReducer;
