import { usersAPI } from "../api/api";
import { reducerHelper } from "../utils/reducerHelper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: reducerHelper(state.users, 'id', action.userId, {followed: true})
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: reducerHelper(state.users, 'id', action.userId, {followed: false})
      };
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isInProgress
          ? [...state.followingInProgress, action.userId]
          : [state.followingInProgress.filter((id) => id !== action.userId)],
      };
    }
    default:
      return state;
  }
};

export let follow = (userId) => ({ type: FOLLOW, userId });
export let unfollow = (userId) => ({ type: UNFOLLOW, userId });
export let setUsers = (users) => ({ type: SET_USERS, users });
export let setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export let setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});
export let toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export let toggleFollowingProgress = (isInProgress, userId) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isInProgress,
  userId,
});

export let getUsersThunkCreator = (currentPage, pageSize, isUpdate) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    if (isUpdate) {
      dispatch(setCurrentPage(currentPage));
    }
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    if (!isUpdate) {
      dispatch(
        setTotalUsersCount(
          response.data.totalCount
        )
      );
    }
  };
};

export let followUnfollowThunkCreator = async (userId, dispatch, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export let unfollowThunkCreator = (userId) => {
  return async (dispatch) => {
    followUnfollowThunkCreator(userId, dispatch, usersAPI.unfollowUser, unfollow);
  };
};

export let followThunkCreator = (userId) => {
  return async (dispatch) => {
    followUnfollowThunkCreator(userId, dispatch, usersAPI.followUser, follow);
  };
};


