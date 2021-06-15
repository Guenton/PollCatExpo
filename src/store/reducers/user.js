import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_AVATAR_URI,
  TOGGLE_NOTIFICATIONS,
} from '../actions/user';

const initialState = {
  firstName: '',
  lastName: '',
  avatarUri: '',
  notifications: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.input };
    case SET_LAST_NAME:
      return { ...state, lastName: action.input };
    case SET_AVATAR_URI:
      return { ...state, avatarUri: action.input };
    case TOGGLE_NOTIFICATIONS:
      return { ...state, notifications: !state.notifications };
    default:
      return state;
  }
};

export default userReducer;
