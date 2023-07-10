import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {fontSize, inputBox} from '../assets/styles/common';
import {RNSVGGroup} from 'react-native-svg';
const WithdrawAmount = ({navigation}) => {
  const [searchData, setSerchData] = useState();

  const handalInput = () => {
    setSerchData(searchData);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.container}>
          {/* <Header navigation={navigation} /> */}
          <View style={[styles.top_header_box]}>
            <Text style={[styles.top_header_text, {flex: 3}]}>My Earnings</Text>
            <View style={[styles.notify_icon, {flex: 1}]}>
              <TouchableOpacity>
                <Image
                  width={45}
                  height={45}
                  source={require('../assets/images/ballnotify.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.amount_box}>
            <Text style={styles.amount_title}>Total Withdraw</Text>
            <Text style={styles.amount_title_amount}>{'\u20B9'}384658</Text>
          </View>
          <Text style={styles.mode_text}>Mode Of Withdrawl</Text>
          <View style={styles.earning_section}>
            <View style={styles.earning_card}>
              <Text
                onPress={() => navigation.navigate('Banklist')}
                style={styles.earning_card_count}>
                {' '}
                Bank
              </Text>
            </View>
          </View>
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
  },

  top_header_box: {
    flex: 1,
    paddingBottom: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top_header_text: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 26,
  },
  notify_icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount_box: {
    marginTop: 15,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    elevation: 4,
    elevation: 7,
    backgroundColor: '#fff',
    shadowColor: '#333',
    justifyContent: 'space-between',
  },
  amount_title: {
    fontSize: 19,
    fontWeight: 600,
    letterSpacing: 1,
    color: 'gray',
  },
  amount_title_amount: {
    fontSize: 21,
    fontWeight: 500,
    color: '#0A8AFF',
  },
  mode_text: {
    fontSize: 21,
    fontWeight: 500,
    color: '#222',
    paddingTop: 30,
  },
  earning_section: {
    marginTop: 15,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  earning_card: {
    width: '47%',
    height: 93.75,
    borderRadius: 10,
    elevation: 7,
    backgroundColor: '#fff',
    shadowColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earning_card_count: {
    color: '#0A8AFF',
    fontSize: 24,
    paddingBottom: 5,
    fontWeight: '500',
  },
});
export default WithdrawAmount;
