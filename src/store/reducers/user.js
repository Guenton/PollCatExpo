import { SET_FIRST_NAME, SET_LAST_NAME, SET_AVATAR_URI } from '../actions/user';

const initialState = {
  firstName: '',
  lastName: '',
  avatarUri: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.input };
    case SET_LAST_NAME:
      return { ...state, lastName: action.input };
    case SET_AVATAR_URI:
      return { ...state, avatarUri: action.input };
    default:
      return state;
  }
};

export default userReducer;
