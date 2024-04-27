import {configureStore} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  name: 'krisna murti',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    }
  }
    return state;
};

const store = configureStore({
  reducer: reducer,
});

export default store;
