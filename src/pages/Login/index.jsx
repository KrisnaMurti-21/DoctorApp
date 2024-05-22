import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {child, get, getDatabase, ref} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, showError, storeData, useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const Login = () => {
    dispatch({type: 'SET_LOADING', value: true});
    setForm('reset');
    const auth = getAuth(Fire);
    const db = getDatabase(Fire);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        // contoh penggunaan child dimana child untuk membungkuskan ref db
        get(child(ref(db), `doctors/${success.user.uid}/`))
          .then(snapshot => {
            if (snapshot.exists()) {
              storeData('user', snapshot.val());
              navigation.replace('Splash');
            } else {
              showError('No data available');
            }
          })
          .catch(err => {
            showError('No data available');
          });
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link title={'Forgot My Password'} size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={Login} />
        <Gap height={30} />
        <Link
          title={'Create New Account'}
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    marginTop: 40,
    marginBottom: 40,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: 153,
  },
});
