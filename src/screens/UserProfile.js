import Config from 'react-native-config';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';

import {centerContainer} from '../assets/styles/common';

// import { useDispatch } from 'react-redux';
// import { SIGNEDIN } from '../redux/actionTypes';
const ENDPOINT = '/user/login';

const UserProfile = ({navigation}) => {
  // const dispatch = useDispatch();

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    setAppDeviceId(token);
    console.log('deviceToken', token);
  };
  // Somewhere in your code
  useEffect(() => {}, []);
  return (
    <KeybaordAvoidingWrapper style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.userDetailsBox}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/images/user-profile.png')} />
            </View>
            <View style={styles.userDetails}>
              <View>
                <Text style={styles.headingTitle}>Your Profile</Text>
                <Text style={styles.headingPara}>
                  It Gets easier if you get this done here, Because you have to
                  do it later anyways
                </Text>
                <View style={styles.userDetailContainer}>
                  <View style={styles.userImageContainer}>
                    <Image
                      style={{height: 100, width: 100}}
                      source={require('../assets/images/avatar.png')}
                    />
                  </View>
                  <View style={styles.userPersonalDetail}>
                    <View style={styles.userPersonalDetailBox}>
                      <Text style={styles.userHeading}>Full Name</Text>
                      <Text style={styles.userd}>Rohan Verma</Text>
                    </View>
                    <View style={styles.userPersonalDetailBox}>
                      <Text style={styles.userHeading}>Email Id</Text>
                      <Text style={styles.userd}>rohan@gmail.com</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dbBox}>
                  <Text style={styles.userHeading}>Date Of Birth</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 10,
                      columnGap: 20,
                    }}>
                    <Text style={[styles.userd, {flex: 1}]}>DD</Text>
                    <Text style={[styles.userd, {flex: 1}]}>MM</Text>
                    <Text style={[styles.userd, {flex: 1}]}>YYYY</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contantContainer}>
            <View style={styles.socialContact}>
              <Text style={[styles.headingTitle, styles.headingSocial]}>
                Social Meida{'\n'}Connect
              </Text>
              <View style={{textAlign: 'center'}}>
                <View style={styles.social_url}>
                  <Image
                    style={styles.social_meida_icon}
                    source={require('../assets/images/youtube.png')}
                  />
                  <TouchableOpacity>
                    <Text style={styles.social_url_text}>Instagram Url</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.social_url}>
                  <Image
                    style={styles.social_meida_icon}
                    source={require('../assets/images/linkdin.png')}
                  />
                  <TouchableOpacity>
                    <Text style={styles.social_url_text}>Linkdin Url</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.social_url}>
                  <Image
                    style={styles.social_meida_icon}
                    source={require('../assets/images/instagram.png')}
                  />
                  <TouchableOpacity>
                    <Text style={styles.social_url_text}>Instagram Url</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.social_url}>
                  <Image
                    style={styles.social_meida_icon}
                    source={require('../assets/images/facebook.png')}
                  />
                  <TouchableOpacity>
                    <Text style={styles.social_url_text}>FaceBook URL</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeybaordAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: centerContainer.alignCenter,
    position: 'relative',
  },
  userImageContainer: {
    // resizeMode: 'contain',
    // height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
  },
  userDetailsBox: {
    position: 'relative',
  },
  headingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: 1,
    marginBottom: 8,
  },
  headingPara: {
    fontWeight: '400',
    color: 'gray',
    fontSize: 18,
    marginBottom: 10,
  },
  userDetails: {
    position: 'absolute',
    top: 80,
    padding: 20,
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
  },
  userDetailContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  userPersonalDetail: {
    paddingLeft: 20,
    paddingTop: 5,
    flex: 2,
  },
  userPersonalDetailBox: {
    paddingBottom: 5,
  },
  userHeading: {
    fontWeight: '600',
    fontSize: 22,
    paddingBottom: 5,
    color: '#222',
    textTransform: 'capitalize',
  },
  userd: {
    fontWeight: '400',
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  dbBox: {
    paddingTop: 10,
  },
  userBd: {},
  contantContainer: {
    position: 'relative',
  },
  socialContact: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headingSocial: {
    position: 'absolute',
    top: -100,
    width: '100%',
    textAlign: 'center',
  },
  social_url: {
    position: 'relative',
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#727272',
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  social_url_text: {
    color: '#727272',
    fontSize: 17,
    fontWeight: 600,
    paddingLeft: 60,
  },
  social_meida_icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 32,
    height: 32,
  },
});

export default UserProfile;
