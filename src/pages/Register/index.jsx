import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {
  colors,
  getData,
  getFirebaseErrorMessage,
  storeData,
  useForm,
} from '../../utils';
import {Fire} from '../../config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getDatabase, ref, set} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    category: 'dokter umum',
    university: '',
    str_number: '',
    hospital_address: '',
    gender: 'pria',
    email: '',
    password: '',
  });

  const [itemCategory] = useState([
    {
      id: 1,
      label: 'Dokter Umum',
      value: 'dokter umum',
    },
    {
      id: 2,
      label: 'Psikiater',
      value: 'psikiater',
    },
    {
      id: 3,
      label: 'Dokter Obat',
      value: 'dokter obat',
    },
    {
      id: 4,
      label: 'Dokter Anak',
      value: 'dokter anak',
    },
    {
      id: 5,
      label: 'Dokter Bedah',
      value: 'dokter bedah',
    },
  ]);

  const [itemGender] = useState([
    {
      id: 1,
      label: 'Pria',
      value: 'pria',
    },
    {
      id: 2,
      label: 'Wanita',
      value: 'wanita',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);
    setLoading(true);
    const auth = getAuth(Fire);
    const db = getDatabase(Fire);

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.category,
          category: form.category,
          rate: 0,
          university: form.university,
          str_number: form.str_number,
          hospital_address: form.hospital_address,
          gender: form.gender,
          email: form.email,
          uid: success.user.uid,
        };
        set(ref(db, 'doctors/' + success.user.uid + '/'), data);
        storeData('user', data);

        navigation.navigate('UploadPhoto', data);
        console.log(success);
      })
      .catch(error => {
        setLoading(false);
        const errorMessage = getFirebaseErrorMessage(error.code);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log(error);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title={'Daftar Akun'} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Kategori"
              value={form.category}
              onValueChange={value => setForm('category', value)}
              select
              selectItem={itemCategory}
            />
            <Gap height={24} />
            <Input
              label="Universitas"
              value={form.university}
              onChangeText={value => setForm('university', value)}
            />
            <Gap height={24} />
            <Input
              label="Nomor STR"
              value={form.str_number}
              onChangeText={value => setForm('str_number', value)}
            />
            <Gap height={24} />
            <Input
              label="Alamat Rumah Sakit"
              value={form.hospital_address}
              onChangeText={value => setForm('hospital_address', value)}
            />
            <Gap height={24} />
            <Input
              label="Jenis Kelamin"
              value={form.gender}
              onValueChange={value => setForm('gender', value)}
              select
              selectItem={itemGender}
            />
            <Gap height={24} />
            <Input
              label="Email"
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
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
            <Gap height={40} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {paddingHorizontal: 40, flex: 1},
});
