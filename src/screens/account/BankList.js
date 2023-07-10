import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import request from '../../utils/request';
import { useSelector } from 'react-redux';
import SucessLbl from '../../components/SuccessCom';
import ErroLabel from '../../components/ErrorCom';
const ENDURL = '/wallet/userbankaccount';
const ENDPOINT = '/wallet/userwithdraw';
const deviceType = Platform.OS == 'ios' ? 4 : 3;
const BankList = ({ navigation }) => {
  const [getAccountID, setSetAccountID] = useState(null);
  const [accountdata, setAccountData] = useState([]);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [modelView, setModelView] = useState(false);
  
  
  const userToken = useSelector((state) => {
    return state.user.userToken;
  });

  const getDetails = async () => {
    request
      .post(
        navigation,
        Config.API_URL + ENDURL,
        {
          apiAuth: Config.API_AUTH,
          device_type: deviceType,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then(({ data }) => {
        console.log('acclistold', data);
        if (data.response.accountlist.length && data.response.accountlist) {
          setAccountData(data.response.accountlist);
          setAvailableAmount(data.response.availableAmount);
        } else {
          setAccountData([]);
        }
        console.log('acclistnew', accountdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
  }, [userToken]);

  const PressAccountTab = (acountID) => {
    setSetAccountID(acountID);
    setModelView(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.upi_id_slect_text}>
            Select the Account where you want your money to be transferred
          </Text>
          <View>
            {accountdata.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() => PressAccountTab(item.account_ref_id)}
                  >
                    <View style={styles.upi_box}>
                      <Text style={styles.upi_box_text}>
                        {item.name_on_account}
                      </Text>
                      <Text style={styles.upi_box_a_text}>
                        ****{item.account_no.slice(4)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <Withdraw
        getAccountID={getAccountID}
        modelView={modelView}
        setModelView={setModelView}
        navigation={navigation}
        availableAmount={availableAmount}
        userToken={userToken}
      />
    </SafeAreaView>
  );
};


const Withdraw = ({
  setModelView,
  modelView,
  getAccountID,
  navigation,
  availableAmount,
  userToken,
}) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const withdrawmoney = (inputData, getAccountID,availableAmount,userToken,navigation) => {
    
    if (inputData < 100) {
      setError('Amount can not be less than 100')
      // Perform withdrawal logic here
    } 
    else if(inputData > availableAmount) {
      setError('Requested amount is greater than available amount')
      // Perform withdrawal logic here
    } 
    else 
    {
      request
      .post(
        navigation,
        Config.API_URL + ENDPOINT,
        {
          apiAuth: Config.API_AUTH,
          device_type: deviceType,
          amount:inputData,
          account_ref_id:getAccountID
        },
        {
          headers: {
            Authorization: userToken,
          },
        },
      )
      .then(({ data }) => {
        console.log('newcollab', data);
        if (data.code == 1 && data.error == 0) {
          setError('')
          setSuccess(data.msg);
          setTimeout(() => {
            navigation.navigate('Myearning');
           }, 2000);
        } else {
          setError(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <Modal style={styles.modalBox} isVisible={modelView}>
      <View style={styles.bottemSheet}>
        <Text onPress={() => setModelView(false)} style={styles.close_button_model}>
          Close
        </Text>
        <View style={styles.model_title_box}>
          <Text style={styles.total_withdrawal}>Available Amount</Text>
          <Text style={styles.total_withdrawal_amount}>
            ₹{availableAmount}
          </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.enter_amount_title}>Enter Amount</Text>
          <View>
            <TextInput
              autoCapitalize="none"
              style={styles.inputText}
              value={inputData}
              keyboardType="numeric"
              placeholderTextColor="#666"
              onChangeText={(data) => setInputData(data)}
              placeholder="Enter the Amount you want to withdraw"
            />
          </View>
        </View>

        {
          success ? <SucessLbl message = {success}/> : null
        }
        {
            error ? <ErroLabel message = {error} /> : null
        }
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            style={styles.withdraw_button}
            onPress={() => withdrawmoney(inputData, getAccountID,availableAmount,userToken,navigation)}
          >
            <Text style={styles.withdraw_button_text}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    position: 'relative',
  },
  upi_id_slect_text: {
    fontSize: 16,
    textTransform: 'capitalize',
    paddingBottom: 10,
  },
  upi_box: {
    position: 'relative',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  upi_box_a_text: {
    position: 'absolute',
    right: 10,
    top: 14,
    color: '#0A8AFF',
    fontSize: 18,
  },
  upi_box_text: {
    fontSize: 18,
  },
  withdraw_button: {
    fontSize: 20,
    backgroundColor: '#0A8AFF',
    elevation: 5,
    width: 300,
    shadowColor: '#333',
    borderRadius: 40,
    padding: 10,
  },
  withdraw_button_text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  modalBox: {
    margin: 0,
    padding: 0,
  },
  bottemSheet: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    overflow: 'hidden',
    paddingTop: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  inputText: {
    padding: 20,
    paddingBottom: 8,
    paddingTop: 8,
    borderWidth: 2,
    marginTop: 10,
    borderColor: 'gray',
    borderRadius: 10,
    color: '#333333',
    width: '100%',
    fontSize: 15,
    backgroundColor: '#fff',
  },
  model_title_box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 4,
    borderBottomColor: '#C4DFDF',
  },
  total_withdrawal: {
    fontSize: 27,
    flexBasis: '70%',
    fontWeight: '500',
  },
  total_withdrawal_amount: {
    fontSize: 27,
    fontWeight: '700',
    color: '#0A8AFF',
  },
  enter_amount_title: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 10,
    fontWeight: '700',
  },
  close_button_model: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: '#A0BFE0',
    fontSize: 16,
    elevation: 2,
    color: '#222',
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export default BankList;
