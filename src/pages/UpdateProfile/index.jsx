import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {getDatabase, ref, update} from 'firebase/database';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {ILNullPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {getAuth, signOut, updatePassword} from 'firebase/auth';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
      // console.log(profile);
    });
  }, []);

  const onUpdate = () => {
    // const auth = getAuth(Fire);
    // signOut(auth).then(() => {
    //   // Sign-out successful.
    //   console.log('sign out success');
    //   navigation.replace('GetStarted');
    // }).catch((error) => {
    //   // An error happened.
    // });
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password minimal 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePasswordData();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePasswordData = () => {
    const auth = getAuth(Fire);
    const user = auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        // Update successful.
        console.log('password updated');
      })
      .catch(error => {
        // An error ocurred
        console.log(error);
      });
  };

  const updateProfileData = () => {
    const db = getDatabase(Fire);

    const data = profile;
    if (photoForDB===!null) {
      data.photo = photoForDB;
    }
    // data.photo = photoForDB;
    update(ref(db, `doctors/${profile.uid}`), data)
      .then(() => {
        console.log('data updated');
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    // console.log('get image');
    launchImageLibrary(
      {
        includeBase64: true,
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        // console.log('respon photo :', response.assets[0].base64);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Anda tidak memilih photo',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          setPhotoForDB(
            `data:${response.assets[0].type};base64,${response.assets[0].base64}`,
          );
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={onUpdate}
            // navigation.goBack('UserProfile')
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
