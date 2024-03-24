import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospitalBG,
} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListHospital} from '../../components';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          pic={DummyHospital1}
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jl. Jend. Sudirman, Kebayoran Baru, Jakarta Selatan"
        />
        <ListHospital
          pic={DummyHospital2}
          type="Rumah Sakit Anak"
          name="Happy Family & Kids"
          address="Jln. Surya Sejahtera 20"
        />
        <ListHospital
          pic={DummyHospital3}
          type="Rumah Sakit Jiwa"
          name="Tingkatan Paling Atas"
          address="Jl. Jend. Sudirman, Kebayoran Baru, Jakarta Selatan"
        />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
});
