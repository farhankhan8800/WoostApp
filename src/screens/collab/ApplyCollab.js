import React, {useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,Platform, StyleSheet, Image, TextInput} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
const ENDPOINT = '/campaignform/campaignrequestform';
const ENDURL ='/campaignform/campaignrequestsubmit';
import SucessLbl from '../../components/SuccessCom';
import ErroLabel from '../../components/ErrorCom';
import request from '../../utils/request'
import CustomWebView from 'react-native-render-html';
import Modal from 'react-native-modal';

const ApplyCollab = ({navigation,route}) => {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const userToken = useSelector(state => state.user.userToken);
    const [inputValues, setInputValues] = useState({});
  const [acceptNotify, setAcceptNotify] = useState(false);
  const [showForm, setShowform] = useState(false);
  const [FormData, setFormData] = useState([]);
  const [campaign, setCampaign] = useState({});
  const[loading,setLoading] =useState(false);
  const[success,setSuccess] =useState('');
  const[error,setError] =useState('');
  const[showBottomSheet,setShowBottomSheet] =useState(false);
  const  levelbar = '70%';
  const cam_id = route.params.cam_id;
  const getDetails = () => {
    setLoading(true);
    request.post(navigation,Config.API_URL + ENDPOINT, {
        'apiAuth': Config.API_AUTH,
        'cam_id': cam_id,
        'device_type': deviceType,
    }, {
        headers: {
            Authorization: userToken,
        },
    }).then(({ data }) => {
        console.log('RequestCollab',data);
        if (data.code == 1 && data.error == 0) 
        {  
            setShowform(true);
            setFormData(data.response.form);
            setCampaign(data.response.campaign);
            console.log('FormData',FormData);
        }
        else 
        {
            // navigation.pop();
            setShowBottomSheet(true);
        }
       
        setLoading(false);
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        setLoading(false);
    });
};
   

const handleInputChange = (fieldName, value) => {
    setError('');
    setInputValues(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  
 const handleConfirm = () => {
  console.log('Form Data:', inputValues);
  const emptyFields = Object.keys(inputValues).filter(field => !inputValues[field]);

  if (emptyFields.length > 0) {
    const emptyFieldNames = emptyFields.map(field => `fd ${field.split('fd')[1]}`);
    // alert(`Please fill in the following fields: ${emptyFieldNames.join(', ')}`);
    setError('All Fields are required')
    return;
  }  
        else {
          // Prepare the form data
          const formDataPrepare = {
            ...inputValues,
            // Add any additional fields you want to include
            apiAuth: Config.API_AUTH,
            cam_id: cam_id,
            device_type: deviceType,
            'acceptNotify':acceptNotify,
          };

          request.post(navigation,Config.API_URL + ENDURL,formDataPrepare , {
            headers: {
                Authorization: userToken,
            },
        }).then(({ data }) => {
            console.log('RequestResponseForm',data);
            if (data.code == 1 && data.error == 0) 
            {  
                setSuccess('You have successfully Applied to this campaign');
                setTimeout(() => {
                    
                    navigation.navigate('Home');
                   
                  }, 2000);
            }
            else 
            {
                setError('There is Some error while applying')
            }
           
            // setLoading(false);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
        }
  };


  useEffect(()=>{
    getDetails();
    console.log('ApplyCOllab',acceptNotify);
    console.log('cam_id',cam_id);
  },[cam_id])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {
            showForm ?
       
        <View style={styles.container}>
          <View style={styles.top_header}>
            <Image
              style={styles.top_header_img}
              source={{ uri: campaign.store_image }}
            />
            <View style={styles.top_header_box}>
              <Text style={styles.top_header_name_title}>{campaign.title}</Text>
              <View style={styles.top_applid_box}>
                <Text style={styles.top_applid_tit}>Apply By </Text>
                <Text>{campaign.submission_time} </Text>
              </View>
            </View>
          </View>
          <View style={styles.main_box}>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>
                Creator Requirements
              </Text>
              <View style={styles.line_style}></View>
              <View>
                
              <CustomWebView style={styles.txtDescription} source={{ html: campaign.cam_requirement }} />
                
                
                
              </View>
            </View>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>
                Selection Possibility
              </Text>
              <View style={styles.line_style}></View>

              <View style={{paddingTop: 10}}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.status_bar_box}>
                    <View style={[{ width: levelbar }, styles.status_bar_fill]} ></View>
                  </View>
                </View>

                {FormData.map((field, index) => {
                const inputValue = inputValues[field.field_name] || ''; // Update the inputValues state
                
                return (
                    <View style={styles.input_box} key={index}>
                    <Text style={styles.input_lable}>{field.req_title}</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.inputText}
                        value={inputValue}
                        placeholderTextColor="#666"
                        onChangeText={value => handleInputChange(field.field_name, value)}
                        placeholder={field.placeholder}
                    />
                    </View>
                );
                })}

              </View>
            </View>
          </View>
          <View style={styles.whatApp_box}>
            <View>
              <CheckBox
                disabled={false}
                value={acceptNotify}
                onValueChange={newValue => setAcceptNotify(newValue)}
              />
            </View>

            <Image
              style={styles.whatapp_icon}
              source={require('../../assets/images/logos_whatsapp-icon.png')}
            />
            <Text style={styles.whatApp_text}>
              Get Whatsapp Notification, Regarding, Relavent Campaigns AndUpdate
            </Text>
          </View>
          {
                        error && <ErroLabel message={error} />
                  }
                  {
                        success && <SucessLbl message={success} />
                  }
          <View style={styles.apply_button_box}>
            <TouchableOpacity style={styles.apply_button} onPress={handleConfirm}>
              <Text style={styles.apply_button_text}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        : "" }

        

        
        <Modal style={styles.modalBox} isVisible={showBottomSheet}>
      <View style={styles.bottemSheet}>
        
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.enter_amount_title}>You have Successfully Applied to this Campaign</Text>
          <View>
            
          </View>
        </View>

        
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
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.withdraw_button_text}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

        
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
  top_header: {
    padding: 10,
    flex: 1,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    alignItems: 'center',
    paddingRight: 0,
  },
  top_header_img: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  top_header_name_title: {
    fontSize: 19,
    fontWeight: 500,
    paddingBottom: 3,
    color: '#222',
    textTransform: 'capitalize',
  },
  top_applid_box: {
    flex: 1,
    flexDirection: 'row',
  },
  top_applid_tit: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: 500,
  },

  main_box_card: {
    borderRadius: 10,
    elevation: 7,
    backgroundColor: '#fff',
    shadowColor: '#333',
    padding: 15,
    paddingBottom: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  main_box_card_title: {
    fontSize: 17,
    fontWeight: 600,
    color: '#222',
  },
  line_style: {
    width: '80%',
    height: 2,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#EEDBA0',
  },
  company_name: {
    color: '#222',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  sub_title_card: {
    fontSize: 16,
    fontWeight: 500,
    position: 'relative',
    paddingBottom: 5,
    color: '#222',
  },
  sub_title_card_name: {
    paddingLeft: 10,
    fontSize: 15,

    fontWeight: 400,
    color: '#222',
  },
  sub_title_card_img: {
    width: 30,
    height: 30,
  },
  real_post_box: {
    padding: 10,
    borderColor: '#222',
    borderWidth: 0.4,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  sub_card_real_img: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
  sub_card_real_title: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.8,
  },
  sub_card_real_dur: {
    color: '#222',
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.7,
  },

  apply_button: {
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 30,
    backgroundColor: 'yellow',
  },
  apply_button_text: {
    color: '#222',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 800,
    textTransform: 'uppercase',
  },
  apply_button_box: {
    alignItems: 'center',
    padding: 20,
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
  input_lable: {
    fontSize: 17,
    paddingBottom: 5,
  },
  input_box: {
    paddingBottom: 10,
  },
  status_bar_box: {
    margin: 10,
    overflow: 'hidden',
    width: 300,
    backgroundColor: '#C3E2FF',
    marginBottom: 20,
    borderRadius: 20,
    elevation: 3,
  },
  status_bar_fill: {
    height: 10,
    borderRadius: 20,
    // width: '70%',
    backgroundColor: '#FF4B4B',
  },
  whatApp_box: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  whatapp_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  whatApp_text: {
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 5,
    textTransform: 'capitalize',
    maxWidth: 300,
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
});

export default ApplyCollab;