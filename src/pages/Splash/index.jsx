import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {auth} from '../../config/Fire';
import {onAuthStateChanged} from 'firebase/auth';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setTimeout(() => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          navigation.replace('MainApp');
        } else {
          // User is signed out
          navigation.replace('GetStarted');
        }
      }, 3000);
    });
    return unsubscribe; // Ini untuk cleanup subscription saat komponen di-unmount
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Doctor App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
