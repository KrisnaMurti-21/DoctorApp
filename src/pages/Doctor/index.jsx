import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {
  child,
  get,
  getDatabase,
  limitToFirst,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {Fire} from '../../config';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const dbRef = ref(getDatabase(Fire));
  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctor();
    getNews();
  }, []);

  const parseArray = listObject => {
    const data = [];
    Object.keys(listObject).map(key => {
      data.push({
        id: key,
        data: listObject[key],
      });
    });
    return data;
  };

  const getTopRatedDoctor = () => {
    //memanggil top rated doctor
    const rateCount = query(
      child(dbRef, `doctors`),
      orderByChild('rate'),
      limitToLast(3),
    );
    // Jika menggunakan "onValue"
    // onValue(rateCount, snapshot => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     // setTopRatedDoctor(snapshot.val());
    //   } else {
    //     console.log('No data available');
    //   }
    // })
    get(rateCount)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = parseArray(snapshot.val());
          console.log('data parse:', data);
          setDoctors(data);
          // console.log(snapshot.val());
          // setTopRatedDoctor(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getNews = () => {
    //memanggil news
    get(child(dbRef, `news`))
      .then(snapshot => {
        if (snapshot.exists()) {
          setNews(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getCategoryDoctor = () => {
    //memanggil category dokter
    get(child(dbRef, `category_doctor`))
      .then(snapshot => {
        if (snapshot.exists()) {
          setCategoryDoctor(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau Konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor')}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(item => {
              return (
                <RatedDoctor
                  key={item.id}
                  name={item.data.fullName}
                  desc={item.data.profession}
                  avatar={{uri: item.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile')}
                />
              );
            })}

            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map(item => {
            return <NewsItem key={item.id} {...item} />;
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 210,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
