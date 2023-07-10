import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {fontSize, inputBox} from '../assets/styles/common';
const SocialLinkVarifyBottomSheet = ({navigation}) => {
  const [searchData, setSerchData] = useState();

  const handalInput = () => {
    setSerchData(searchData);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Header navigation={navigation} /> */}
        <View style={styles.mainContainer}>
          <View style={styles.webContainer}></View>
          <View style={styles.bottmSheet}>
            <View style={{flex: 1, alignItems: 'center', padding: 20}}>
              <Text style={styles.title_text}>YouTube Account</Text>
              <View>
                <View style={styles.channel_details_box}>
                  <Text style={styles.channel_details_box_title}>
                    Channel Name :
                  </Text>
                  <Text style={styles.channel_details_box_name}>
                    @freekaamaal
                  </Text>
                </View>
                <View style={styles.channel_details_box}>
                  <Text style={styles.channel_details_box_title}>
                    Subscribe :
                  </Text>
                  <Text style={styles.channel_details_box_name}>8.5k</Text>
                </View>
                <View style={styles.channel_details_box}>
                  <Text style={styles.channel_details_box_title}>Views :</Text>
                  <Text style={styles.channel_details_box_name}>83485</Text>
                </View>
              </View>
              <Text style={styles.para_text}>
                Click on continue to confirm this is your youtube account
              </Text>
              <TouchableOpacity style={styles.withdraw_button}>
                <Text style={styles.withdraw_button_text}>continue</Text>
              </TouchableOpacity>
              <Text style={styles.para_text_error}>No This is not me</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#222',
  },
  bottmSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'gray',
    zIndex: 99,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 50,
    elevation: 4,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#222',
    shadowOpacity: 0.2,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    textAlign: 'center',
  },
  webContainer: {},
  title_text: {
    fontSize: 23,
    color: '#222',
    fontWeight: 700,
    textTransform: 'capitalize',
    paddingBottom: 10,
  },
  para_text: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,
  },
  withdraw_button: {
    fontSize: 20,
    backgroundColor: '#0A8AFF',
    elevation: 5,
    width: 150,
    shadowColor: '#333',
    borderRadius: 40,
    padding: 10,
  },
  withdraw_button_text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  para_text_error: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
  channel_details_box: {
    flexDirection: 'row',
    paddingBottom: 6,
  },
  channel_details_box_title: {
    fontSize: 17,
    color: '#222',
    fontWeight: 500,
    paddingRight: 10,
  },
  channel_details_box_name: {
    fontSize: 15,
    color: '#222',
  },
});
export default SocialLinkVarifyBottomSheet;
