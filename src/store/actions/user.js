export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_AVATAR_URI = 'SET_AVATAR_URI';

export const setFirstName = (input = '') => ({
  type: SET_FIRST_NAME,
  input: input.charAt(0).toUpperCase() + input.slice(1),
});
export const setLastName = (input = '') => ({
  type: SET_LAST_NAME,
  input: input.charAt(0).toUpperCase() + input.slice(1),
});
export const setAvatarUri = (input = '') => ({
  type: SET_AVATAR_URI,
  input,
});
