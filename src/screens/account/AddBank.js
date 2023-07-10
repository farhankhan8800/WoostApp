import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { View, Alert, Platform, Text, StyleSheet, Image, TextInput } from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { fontSize, inputBox } from '../assets/styles/common';
import { RNSVGGroup } from 'react-native-svg';
import { Formik } from 'formik';
import * as yup from 'yup';
import ErroLabel from '../../components/ErrorCom';
import { useSelector, useDispatch } from 'react-redux';
import request from '../../utils/request';
import { store } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const END_URL = '/wallet/addbankaccount'
const AddBankForm = ({ navigation }) => {
  const deviceType = Platform.OS == 'ios' ? 4 : 3;
  const userToken = useSelector(state => {
    return state.user.userToken;
  });
  const [error, setError] = useState(false);
  return (
    <Formik
      initialValues={{

        accountHolderName: '',
        phone: '',
        bankName: '',
        ifscCode: '',
        accountNumber: ''
      }}
      onSubmit={async (values) => {
        // Alert.alert('okay')
        try {
          const { data } = await request.post(
            navigation,
            Config.API_URL + END_URL,
            {
              apiAuth: Config.API_AUTH,
              device_type: deviceType,
              account_no: values.accountNumber,
              name_on_account: values.accountHolderName,
              bank_name: values.bankName,
              bank_ifsc: values.ifscCode
            },
            {
              headers: {
                Authorization: userToken,
              },
            },

          );
          if (data.code == '1' && data.error == '0') 
          {
          // console.log('ADDACC',data);
          AsyncStorage.setItem('phone', data.response.phone);
          AsyncStorage.setItem('account_ref_id', data.response.account_ref_id);
          navigation.navigate('VerifyOtp');
          // Alert.alert('OKAY')
          } 
          else 
          {
            console.log(data);
            setError(data.msg);
          }
        } catch (e) {
          setError(e.message);
        }
      }}
      validationSchema={yup.object().shape({
        accountHolderName: yup
          .string()
          .required('Please, provide your name!').max(40, 'You have exceed the 40 alphabet'),
        bankName: yup
          .string().required('Please enter Bank Name'),
          accountNumber: yup
          .string().required('Enter account Number').max(18, 'Please enter a valid account number'),
        ifscCode: yup
          .string().required('Please enter IFSC Code').min(11, 'IFSC required 11 digit').max(11, 'Please enter a valid IFSC code'),

      })}>
      {({ values, handleChange, errors, touched, handleSubmit }) => (
        <View>
          <View>


            <View style={styles.inputBoxContainer}>
              <TextInput
                autoCapitalize="none"
                style={styles.inputText}
                value={values.accountHolderName}
                placeholderTextColor="#666"
                onChangeText={handleChange('accountHolderName')}
                placeholder="Account Holder Name"
              />
              <View>
                {touched.accountHolderName && errors.accountHolderName && (
                  <Text style={styles.error}>{errors.accountHolderName}</Text>
                )}
              </View>
            </View>



            <View style={styles.inputBoxContainer}>

              <TextInput
                autoCapitalize="none"
                style={styles.inputText}
                value={values.bankName}
                placeholderTextColor="#666"
                onChangeText={handleChange('bankName')}
                placeholder="Bank Name"
              />
              <View>
                {touched.bankName && errors.bankName && (
                  <Text style={styles.error}>{errors.bankName}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputBoxContainer}>
              <TextInput
                autoCapitalize="none"
                keyboardType="numeric"
                style={styles.inputText}
                value={values.accountNumber}
                placeholderTextColor="#666"
                onChangeText={handleChange('accountNumber')}
                placeholder="Account Number"
                maxLength={18}
              />
              <View>
                {touched.accountNumber && errors.accountNumber && (
                  <Text style={styles.error}>{errors.accountNumber}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputBoxContainer}>
              <TextInput
                autoCapitalize="none"
                style={styles.inputText}
                value={values.ifscCode}
                placeholderTextColor="#666"
                onChangeText={handleChange('ifscCode')}
                placeholder=" IFSC Code"
                maxLength={11}
              />
              <View>
                {touched.ifscCode && errors.ifscCode && (
                  <Text style={styles.error}>{errors.ifscCode}</Text>
                )}
              </View>
            </View>
            {error && <ErroLabel message={error} />}
          </View>
          <View style={{ paddingTop: 20, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.withdraw_button}>
              <Text style={styles.withdraw_button_text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const AddBank = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
       <AddBankForm navigation={navigation} />
      </View>
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
  inputText: {
    padding: 20,
    paddingBottom: 8,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    borderColor: 'gray',
    borderRadius: 10,
    color: '#333333',
    width: '100%',
    fontSize: 15,
  },
  inputBoxContainer: {
    paddingBottom: 5,
  },
  error: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: 7,
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
});
export default AddBank;
