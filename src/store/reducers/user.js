import {
  SET_USER_ID,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_AVATAR_URI,
  SET_USER_ARRAY,
  TOGGLE_NOTIFICATIONS,
} from '../actions/user';

const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  avatarUri: '',
  userArray: [],
  notifications: false,
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
    case SET_USER_ARRAY:
      return { ...state, userArray: action.array };
    case TOGGLE_NOTIFICATIONS:
      return { ...state, notifications: !state.notifications };
    default:
      return state;
  }
};

export default userReducer;
