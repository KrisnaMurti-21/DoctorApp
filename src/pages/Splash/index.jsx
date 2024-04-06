import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';
import {colors, fonts, getData} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Fire} from '../../config';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      const auth = getAuth(Fire);
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log("ini hasil dari splash:",user);
          navigation.replace('MainApp');
        } else {
          // User is signed out
          Alert.alert('Silahkan Login Terlebih Dahulu');
          navigation.replace('GetStarted');
        }
      });
      // navigation.replace('GetStarted');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
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
