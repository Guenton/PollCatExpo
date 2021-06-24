import {
  SET_USER_ID,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_AVATAR_URI,
  SET_ALL_USERS_OBJECT,
  SET_SELECTED_USER_OBJECT,
  TOGGLE_NOTIFICATIONS,
} from '../actions/user';

const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  avatarUri: '',
  allUsersObject: {},
  selectedUserObject: {},
  isNotifications: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.input };
    case SET_FIRST_NAME:
      return { ...state, firstName: action.input };
    case SET_LAST_NAME:
      return { ...state, lastName: action.input };
    case SET_AVATAR_URI:
      return { ...state, avatarUri: action.input };
    case SET_ALL_USERS_OBJECT:
      return { ...state, allUsersObject: action.object };
    case SET_SELECTED_USER_OBJECT:
      return { ...state, selectedUserObject: action.object };
    case TOGGLE_NOTIFICATIONS:
      return { ...state, isNotifications: !state.isNotifications };
    default:
      return state;
  }
};

export default userReducer;
