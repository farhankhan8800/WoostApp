import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Button} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {inputBox} from '../../assets/styles/common';

const AfterAcceptancePaidBatter = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top_header}>
            <Image
              style={styles.top_header_img}
              source={require('../../assets/images/company-logo.png')}
            />
            <View style={styles.top_header_box}>
              <Text style={styles.top_header_name_title}>Campaign name</Text>
              <View style={styles.top_applid_box}>
                <Text style={styles.top_applid_tit}>Application </Text>
                <Text>Accepted </Text>
              </View>
            </View>
          </View>

          <View>
            <View>
              <View style={styles.main_box}>
                <View style={styles.main_box_top}>
                  <Image
                    style={styles.image_congratulation}
                    source={require('../../assets/images/image_congratulation.png')}
                  />
                  <View style={{padding: 15}}>
                    <Text style={styles.heading_congratulation}>
                      Congratulations
                    </Text>
                    <Text style={styles.text_congratulation}>
                      We are thrilled to have you on board, and we believe that
                      your contribution will make a significant impact on the
                      success of this campaign.
                    </Text>
                  </View>
                </View>
                <View style={styles.main_box_card}>
                  <Text style={styles.main_box_card_title}>
                    Campaign Requirements
                  </Text>
                  <View style={styles.line_style}></View>
                  <View>
                    <Text style={styles.sub_title_card}>
                      Genter:{' '}
                      <Text style={styles.sub_title_card_name}> Female</Text>
                    </Text>
                    <Text style={styles.sub_title_card}>
                      Age-Group:{' '}
                      <Text style={styles.sub_title_card_name}> 24-36</Text>
                    </Text>
                    <Text style={styles.sub_title_card}>
                      Follower Range:{' '}
                      <Text style={styles.sub_title_card_name}> 50k-80k</Text>
                    </Text>
                    <Text style={styles.sub_title_card}>
                      Location:{' '}
                      <Text style={styles.sub_title_card_name}>
                        {' '}
                        Place 1, Place 1, Place 1, Place 1,
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.main_box_card}>
                  <Text style={styles.main_box_card_title}>
                    Deliverables Link
                  </Text>
                  <View style={styles.line_style}></View>
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.sub_title_card}>
                        To Be Posted On -{' '}
                      </Text>
                      <Image
                        style={styles.sub_title_card_img}
                        source={require('../../assets/images/instagram.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.sub_title_card}>Deliverables - </Text>
                      <GetLinkByUser />
                    </View>
                  </View>
                </View>
                <View style={styles.main_box_card}>
                  <Text style={styles.main_box_card_title}>
                    Do You Need Some Hellp?
                  </Text>
                  <View style={styles.line_style}></View>
                  <Text style={styles.text_reactout}>
                    In Case You're Stuck some Where React Out TO Us Heare.
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      paddingTop: 10,
                    }}>
                    <TouchableOpacity>
                      <Image
                        style={styles.need_help_icon}
                        source={require('../../assets/images/maile1.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={styles.need_help_icon}
                        source={require('../../assets/images/whatsapp1.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={styles.need_help_icon}
                        source={require('../../assets/images/call1.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GetLinkByUser = () => {
  const [inputData, setInputData] = useState({
    real1: '',
    real2: '',
    story1: '',
    story2: '',
  });

  const handleInputChange = (key, value) => {
    setInputData(prevInputs => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(inputData);
  };

  
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
  tab_list_con: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tab_button: {
    padding: 9,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
  },
  tab_button_text: {
    fontSize: 16,
    fontWeight: 500,
    color: '#222',
  },
  tab_button_active: {
    backgroundColor: '#0070D7',
  },
  tab_button_text_active: {
    color: '#fff',
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

  main_box_top: {
    borderRadius: 10,
    elevation: 7,
    backgroundColor: '#fff',
    shadowColor: '#333',
    paddingBottom: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
  },
  image_congratulation: {
    width: '100%',
  },
  heading_congratulation: {
    textAlign: 'center',
    padding: 5,
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 21,
    letterSpacing: 1,
    textTransform: 'capitalize',
    color: '#222',
  },
  text_congratulation: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '400',
    lineHeight: 21,
    textTransform: 'capitalize',
  },
  inputText: {
    height: 52,
    padding: inputBox.padding,
    borderWidth: inputBox.borderWidth,
    marginTop: 10,
    borderColor: 'gray',
    borderRadius: 10,
    color: '#333333',
    width: '100%',
    fontSize: 14,
  },
  input_box_style: {
    position: 'relative',
    paddingBottom: 15,
  },
  input_label: {
    position: 'absolute',
    top: -1,
    zIndex: 1,
    letterSpacing: 1,
    textAlign: 'center',
    left: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 500,
  },
  text_reactout: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 500,
    lineHeight: 25,
  },
  submit_button: {
    backgroundColor: '#0A8AFF',
    margin: 30,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderRadius: 30,
  },
  submit_button_text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: 1,
  },
  need_help_icon: {
    width: 60,
    height: 60,
  },
});

export default AfterAcceptancePaidBatter;