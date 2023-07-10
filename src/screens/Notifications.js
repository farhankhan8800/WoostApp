import React,{useEffect,useState} from 'react';
import {View,Platform, Text, StyleSheet, Image, TextInput} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import Config from 'react-native-config';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {PhoneIncoming} from 'react-native-feather';
import request from '../utils/request';
import { useSelector } from 'react-redux';
const ENDPOINT = '/notification/user-notification'
const Notification = ({navigation}) => {
    const deviceType = Platform.OS == 'ios' ? 4 : 3;
    const userToken = useSelector(state => state.user.userToken);
    const [notifications, setNotifications] = useState([]);
    const [nodata, setNodata] = useState('');
    const getNotifications = () => {
        request
          .post(
            navigation,
            Config.API_URL + ENDPOINT,
            {
              apiAuth: Config.API_AUTH,
              device_type: deviceType,
              
            },
            {
              headers: {
                Authorization: userToken,
              },
            },
          )
          .then(({ data }) => {
            console.log('getNotifications', data);
            if (data.code == 1 && data.error == 0) {
                setNotifications(data.response.notification);
              
            } else {
              setNodata(data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
      useEffect(() => {
        getNotifications();
      }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.container}>
            {
                nodata ? 
            <View><Text>Ooops... No Notification Found!!!</Text></View>
            :null
            }
            {
  notifications && notifications.length ?
  notifications.map((item, i) => {
    return (
      <View style={styles.notify_box} key={i}>
        <Image
          style={styles.notify_box_img}
          source={require('../assets/images/notification-screen.png')}
        />
        <View style={styles.notify_contant}>
          <Text style={styles.notify_contant_con}>Congratulations,</Text>
          <Text style={styles.notify_contant_c}>
          {item.message}
          </Text>
        </View>
        <Text style={styles.notify_time}>{item.updated_on}</Text>
      </View>
    );
  }) :null
}

         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    position: 'relative',
  },
  notify_box: {
    padding: 8,
    paddingBottom: 11,
    paddingTop: 11,
    borderColor: 'gray',
    borderWidth: 0.4,
    borderRadius: 7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  notify_box_img: {
    width: 50,
  },
  notify_contant: {
    width: '60%',
  },
  notify_contant_con: {
    fontWeight: 500,
    fontSize: 15,
    color: '#222',
    textTransform: 'capitalize',
  },
  notify_time: {
    fontSize: 12,
    opacity: 0.7,
  },
  notify_contant_c: {
    fontSize: 13,
  },
});

export default Notification;
