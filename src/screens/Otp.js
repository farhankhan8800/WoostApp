import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View,Platform, Text, StyleSheet, Image, Keyboard} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  centerContainer,
  fontSize,
  inputBox,
  commonMargin,
} from '../assets/styles/common';
import OTPin from '../components/OTPin';
import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import ErroLabel from '../components/ErrorCom';
const ENDPOINT = '/user/userverification';
import request from '../utils/request';
import { useDispatch } from 'react-redux';
import { SIGNEDIN } from '../redux/actionTypes';
import SucessLbl from '../components/SuccessCom';
const BASE_URL = Config.API_URL;
const API_AUTH = Config.API_AUTH;

const EnterOTP = ({navigation}) => {
  const deviceType = Platform.OS=='ios' ? 4 : 3 ;
  const [Error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [mobile, setMobile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const get = async () => {
      const numb = await AsyncStorage.getItem('phone');
      setMobile(numb);
    };
    get();
  }, []);
  const verifyOTP = async otp => {
    const token = await AsyncStorage.getItem('registerToken');
    try {
      const {data} = await axios.post(
        BASE_URL + ENDPOINT,
        {
          apiAuth: API_AUTH,
          verification_code: otp,
          device_type: deviceType,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (data.code==1 && data.error==0) 
      {
        dispatch({
          type: SIGNEDIN,
          userToken: data.token,
          userInfo: data.response.userdata,
          });
        setMessage(data.msg);
        setTimeout(() => {
          if (data && data.response.userdata.profile_completion_level=='0') 
         {
          navigation.navigate('Socialprofile');
         }
         else
         {
          navigation.navigate('Home');
         }
        }, 2500);
      } 
      else 
      {
        setMessage('Wrong OTP! Please Re Check and enter');
      }
    } catch (e) {
      console.log('error===>>>', e);
      setError(e);
    }
  };
  return (
    <KeybaordAvoidingWrapper
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/otp-screen.png')} />
        </View>
        <View style={styles.containerContant}>
          <View style={styles.containerContantInner}>
            <View>
              <Text style={[styles.headingSize]}>Verify OTP</Text>
            </View>
            <View style={styles.forgotParagraph}>
              <Text style={styles.innerPara}>
                We've Sent You The Verification Code At
              </Text>

              <Text style={styles.registeredNumber}>+ 91 {mobile}</Text>
              {/* <Text style={styles.registeredNumber}>+ 91 {mobile}</Text> */}
            </View>
            <View>
            {
            Error && <ErroLabel message={Error}/>
            }

            {
            message && <SucessLbl message={message}/>
            }
            </View>
            <View>
              <OTPin
                in={6}
                onDone={otp => {
                  verifyOTP(otp);
                }}></OTPin>
            </View>
          </View>
        </View>
      </View>
    </KeybaordAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    flex: 1,
  },
  imageContainer: {
    alignItems: centerContainer.alignCenter,
  },
  containerContant: {
    position: 'relative',
  },
  containerContantInner: {
    position: 'absolute',
    top: -120,
    left: 22,
  },
  headingSize: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222222',
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputBoxContainer: {
    position: 'relative',
    marginTop: 30,
  },

  inputText: {
    padding: 10,
    borderWidth: inputBox.borderWidth,
    marginTop: inputBox.marginTop,
    borderColor: inputBox.borderColor,
    borderRadius: inputBox.borderRadius,
    color: '#333333',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#f0f0f0',
  },

  lableFont: {
    fontSize: fontSize.inputFont,
  },

  loginButton: {
    alignItems: centerContainer.alignCenter,
    justifyContent: centerContainer.justifyCenter,
    backgroundColor: '#F27935',
    padding: 10,
    marginTop: 30,
    borderRadius: 6,
    fontWeight: 'bold',
    height: 50,
  },

  forgotParagraph: {
    fontSize: fontSize.lableFont,
    marginTop: commonMargin.margin10,
  },
  innerPara: {
    lineHeight: 19,
    fontSize: 19,
  },
  registeredNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 7,
  },
  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyCenter: 'center',
  },
  errorInput: {
    color: 'red',
    marginTop: 10,
    fontSize: 17,
  },
});

export default EnterOTP;
