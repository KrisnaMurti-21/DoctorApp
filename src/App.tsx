import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';

const MainApp = () => {
  const [loading, setLoading] = useState(false);
  const stateLoading = useSelector(state => state.loading);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateLoading && <Loading />}
    </Provider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
