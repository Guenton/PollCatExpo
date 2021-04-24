/*

---> TL;DR Redux Actions for lang Reducer <---

*/

// Export Action String for easy import in Reducer
export const SET_CURRENT_LANG = 'SET_CURRENT_LANG';

// Export Action Dispatchers
export const setCurrentLang = (language = 'eng') => ({ type: SET_CURRENT_LANG, language });
