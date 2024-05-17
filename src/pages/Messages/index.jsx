import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DummyDoctor4, DummyDoctor5, DummyDoctor6} from '../../assets';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {child, get, getDatabase, onValue, ref} from 'firebase/database';
import {Fire} from '../../config';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: DummyDoctor4,
      name: 'Alexander Jannie',
      desc: 'Baik Ibu, terima kasih banyak atas wakt...',
    },
    {
      id: 2,
      profile: DummyDoctor5,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak, karena jeruk itu...',
    },
    {
      id: 3,
      profile: DummyDoctor6,
      name: 'John McParker Steve',
      desc: 'Baik, Menurut pak dokter apa yang haru...',
    },
  ]);
  const [historyChat, setHistoryChat] = useState([]);

  const db = ref(getDatabase(Fire));
  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}`;
    const historyRef = child(db, urlHistory);
    onValue(historyRef, async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const dataDetailDoctor = await get(child(db, urlUidDoctor));
          data.push({
            id: key,
            detailDoctor: dataDetailDoctor.val(),
            ...oldData[key],
          });
        });
        await Promise.all(promises);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user')
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          const dataDoctor = {
            id: chat.detailDoctor.id,
            data: chat.detailDoctor,
          }
          return (
            <List
              key={chat.id}
              profile={{ uri:chat.detailDoctor.photo }}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

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
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginLeft: 16,
    marginTop: 30,
  },
});
