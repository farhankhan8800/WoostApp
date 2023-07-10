import Config from "react-native-config";
import React, { useEffect, useState } from 'react';
import {Platform,View,Text,StyleSheet,Image,TextInput,SafeAreaView,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {centerContainer,fontSize,inputBox,fontColor,commonMargin,} from '../assets/styles/common';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import ErroLabel from "../components/ErrorCom";
import SucessLbl from '../components/SuccessCom';
import KeybaordAvoidingWrapper from "../components/keyboardAvoidingWrapper";
// import DeviceInfo from 'react-native-device-info';
// import messaging from '@react-native-firebase/messaging'
const ENDPOINT = "/user/register";

    const Register = ({ navigation }) => {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const [error, setError]= useState('')
    const [success, setSuccess] = useState('')
    const [app_device_id, setAppDeviceId] = useState('')
//     const getUniqueid = async()=>{
//       const app_device_id = await DeviceInfo.getUniqueId();
//       // setAppDeviceId(app_device_id)
//    }
//    const getDeviceToken = async () => {
//     let token = await messaging().getToken();
//     setAppDeviceId(token)
//     console.log('deviceToken',token);
// }

//     useEffect(()=>{
//       getDeviceToken();
//     },[])

  return (
    <KeybaordAvoidingWrapper>
        <ScrollView bounces={false}>
        <Formik initialValues={{
            name:'',
            email: '',
            phone: '',
            password: '',
            referral: '',
        }}
        onSubmit={async (values) => {
            try {
                      const {data} = await axios.post(Config.API_URL + ENDPOINT,{
                        apiAuth : Config.API_AUTH,
                        device_type: deviceType,
                       name:values.name,
                       email: values.email,
                       pass:values.password,
                       phone: values.phone,
                       referral_code:values.referral,
                       device_type: '4',
                       app_device_id : app_device_id
                      });
                      if (data.token) {
                        // console.log('device_id',app_device_id)
                        setSuccess(data.message)
                        await AsyncStorage.setItem('registerToken', data.token);
                        await AsyncStorage.setItem('phone', values.phone);
                        navigation.navigate('OTP');
                      }
                      else {
                        setError(data.message);
                      }
                    } catch (error) {
                      setError(error.message)
                    }
          }
          }
          
        validationSchema = { yup.object().shape({
           
            name:yup.string().required("Please enter name").matches(/^[A-Za-z ]*$/, "Please enter valid name").max(20,"Maximum 20 character are allowed"),
            email: yup.string().required('Please enter your Email id'),
            phone: yup.string().required("Please enter mobile number").matches(/^[0]?[6789]\d{9}$/
            , "Please enter valid phone"),
            password:yup.string().required('Please Enter password').min(6,'Minimum 6 Characters are required').max(8,'Maxmimum 8 Chareter are required')})}
            >

            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={styles.container}>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/images/login-image.png')} />
                    </View>
                    <View>
                      <Text style={[styles.headingSize]}>Sign Up & Earn</Text>
                    </View>
                    <View style={styles.inputView}>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/user-ico.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={[styles.inputText, styles.lableFont]}
                          placeholderTextColor="#666"
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={() => setFieldTouched('name')}
                          placeholder="Name"
                           />
                            {touched.name && errors.name &&
                      <Text style={styles.error}>{errors.name}</Text>
                    }
                      </View>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/email.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={[styles.inputText, styles.lableFont]}
                          name="email"
                          value={values.email}
                          placeholder="Email ID"
                          placeholderTextColor="#666"
                          onChangeText={handleChange('email')}
                          onBlur={() => setFieldTouched('email')}
                          />
                           {touched.email && errors.email &&
                      <Text style={styles.error}>{errors.email}</Text>
                    }
                      </View>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/phone-reg.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={[styles.inputText, styles.lableFont]}
                          placeholder="Phone"
                          value={values.phone}
                          placeholderTextColor="#666"
                          onChangeText={handleChange('phone')}
                          onBlur={() => setFieldTouched('phone')}
                         />
                           {touched.phone && errors.phone &&
                      <Text style={styles.error}>{errors.phone}</Text>
                    }
                      </View>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/padlock.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={styles.inputText}
                          placeholder="Password"
                          placeholderTextColor="#666"
                          secureTextEntry={true}
                          value ={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={() => setFieldTouched('password')}
                          />
                            {touched.password && errors.password &&
                      <Text style={styles.error}>{errors.password}</Text>
                    }
                      </View>

                      <View style={styles.inputBoxContainer}>
                      <Image
                          source={require('../assets/images/refferal-reg.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={styles.inputText}
                          placeholder="Referral Code"
                          placeholderTextColor="#666"
                          secureTextEntry={true}
                          value ={values.referral}
                          onChangeText={handleChange('referral')}
                          onBlur={() => setFieldTouched('referral')}
                          />
                      </View>
                     {
                        error && <ErroLabel message={error} />
                     }
                     {
                        success && <SucessLbl message = {success} />
                     }
                      <TouchableOpacity
                        onPress={handleSubmit}>
                        <View style={styles.loginButton} >
                          <Text style={styles.loginTxt}>Sign Up</Text>
                        </View>
                      </TouchableOpacity>
                      {/* <View style={styles.socialLogin}>
                        <View style={styles.googleLogin}>
                          <Image source={require('../assets/images/google.png')} />
                          <Text style={styles.googleLoginTxt}>Goolge</Text>
                        </View>
                        <View style={[styles.googleLogin, styles.facebookLogin]}>
                          <Image source={require('../assets/images/google.png')} />
                          <View style={styles.googleLoginTxt}>
                            <Text style={styles.googleLoginTxt}>Facebook</Text>
                          </View>
                        </View>
                      </View> */}
                      <View style={styles.newLogin}>
                        <Text style={[styles.font16, styles.RegisterLink]} onPress={() => navigation.navigate('OTP')}>Login</Text>
                      </View>
                    </View>
                  </View>
            )}
        </Formik>
        </ScrollView>
      </KeybaordAvoidingWrapper>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    // justifyContent: 'center',
  },
  imageContainer: {
    alignItems: centerContainer.alignCenter,
  },
  headingSize: {
    fontSize: fontSize.headingFont,
    fontWeight: '900',
  },
  logo: {
    height: 128,
    width: 128,
  },
  inputBoxContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 33,
    left: 20,
  },

  inputText: {
    height: inputBox.height,
    padding: inputBox.padding,
    borderWidth: inputBox.borderWidth,
    marginTop: inputBox.marginTop,
    borderColor: inputBox.borderColor,
    borderRadius: inputBox.borderRadius,
    paddingLeft: inputBox.paddingLeft,
    color: '#333333',
  },

  lableFont: {
    fontSize: fontSize.inputFont,
  },

  forgotPassword: {
    color: fontColor.linkColor,
    fontSize: fontSize.inputFont,
    fontWeight: '700',
    marginTop: commonMargin.marginTop,
    justifyContent: 'flex-end',
  },
  passwordContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  error: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: 7,
  },
  loginTxt: {
    fontSize: fontSize.headingFont,
    fontWeight: '900',
    color: '#fff',
  },

  orContainer: {
    marginTop: commonMargin.marginTop,
    alignItems: 'center',
    justifyContent: centerContainer.spcBetween,
    itemCenter: 'center',
    position: 'relative',
    flexDirection: 'row',
  },

  borderLeft: {
    borderColor: '#AAAAAA',
    borderTopWidth: 1,
    width: '40%',
    marginTop: 15,
  },

  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },

  googleLogin: {
    backgroundColor: '#FFF3F0',
    padding: 10,
    width: '47%',
    borderRadius: 6,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 15,
    height: 50,
  },

  width50: {
    width: '40%',
  },

  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  googleLoginTxt: {
    fontSize: 16,
    marginLeft: 20,
  },
  newLogin: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  RegisterLink: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#2453C6',
  },
  facebookLogin: {
    backgroundColor: '#e5f1ff'
  }
});

export default Register;
