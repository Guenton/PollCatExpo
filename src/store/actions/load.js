/*

---> TL;DR Redux Actions for load Reducer <---

*/

// Export Action String for easy import in Reducer
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

// Export Action Dispatchers
export const startLoading = () => ({ type: START_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });
