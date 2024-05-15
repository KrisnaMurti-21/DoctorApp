import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, List} from '../../components';
import {DummyDoctor1} from '../../assets';
import {colors} from '../../utils';
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {Fire} from '../../config';

const ChooseDoctor = ({navigation, route}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;
  const dbRef = ref(getDatabase(Fire));
  useEffect(() => {
    const datacategory = itemCategory.category;
    console.log(datacategory);
    callDoctorByCategory(itemCategory.category);
  }, []);
  const callDoctorByCategory = category => {
    const dataDoctorbyQuery = query(
      child(dbRef, `doctors`),
      orderByChild('category'),
      equalTo(category),
    );
    get(dataDoctorbyQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setListDoctor(data);
          console.log(data);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={`pilih ${itemCategory.category}`}
        type={'dark'}
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map(item => {
        return (
          <List
            key={item.id}
            type={'next'}
            profile={{uri: item.data.photo}}
            name={item.data.fullName}
            desc={item.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', item)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
