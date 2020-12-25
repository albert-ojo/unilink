export const SET_CHECK = "SET_CHECK";
export const SET_CHECK_COUNT = "SET_CHECK_COUNT";

export const setCheck = (id) => {
  return { type: SET_CHECK, MilestoneId: id };
};

export const setCheckCount = () => {
  return { type: SET_CHECK_COUNT };
};
