import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts, getChatTime, getData, setDateChat} from '../../utils';
import {getDatabase, onValue, push, ref, set} from 'firebase/database';
import {Fire} from '../../config';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const db = getDatabase(Fire);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;

    const urlFirebase = `chatting/${chatID}/allChat`;
    const dbRef = ref(db, urlFirebase);
    onValue(dbRef, snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key];
          const newDataChat = [];
          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });
          allDataChat.push({
            id: key,
            data: newDataChat,
          });
        });
        console.log('Data chat :', allDataChat);
        setChatData(allDataChat);
      }
    });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user')
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${dataDoctor.data.uid}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessagesUser = `messages/${user.uid}/${chatID}`;
    const urlMessagesDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };

    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };
    const dbRefUserHistory = ref(db, urlMessagesUser);
    const dbRefDoctorHistory = ref(db, urlMessagesDoctor);
    // set ref database
    const dbRef = ref(db, urlFirebase);
    // push data dengan unique key melalui push
    const newMessage = push(dbRef);
    // kirim data ke database
    set(newMessage, data)
      .then(() => {
        console.log('message sent');
        //belum dicoba
        set(dbRefUserHistory, dataHistoryChatForUser);
        set(dbRefDoctorHistory, dataHistoryChatForDoctor);
        setChatContent('');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        photo={{uri: dataDoctor.data.photo}}
        type={'dark-profile'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={itemChat.data.sendBy === user.uid}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}} // Gunakan URL foto sebagai string
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => {
          setChatContent(value);
        }}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
