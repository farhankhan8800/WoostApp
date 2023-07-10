import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {inputBox} from '../../assets/styles/common';

const AfterAcceptancePerformance = ({navigation}) => {
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
                <View style={styles.link_box_style}>
                  <Text
                    style={[
                      styles.main_box_card_title,
                      {color: 'gray', paddingBottom: 14, fontSize: 18},
                    ]}>
                    Your Link
                  </Text>
                  <View style={styles.link_box_inner_style}>
                    <View>
                      <Image
                        style={styles.user_image}
                        source={require('../../assets/images/userhome.png')}
                      />
                    </View>
                    <View style={styles.link_inner_gray_box}>
                      <Text style={styles.link_inner_gray_box_text}>
                        We are thrilled to have you on board, dasdas asdasd
                        dasdasdas da
                      </Text>
                      <TouchableOpacity>
                        <Image
                          style={styles.copy_image}
                          source={require('../../assets/images/copy-line.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.main_box_card}>
                  <Text
                    style={[
                      styles.main_box_card_title,
                      {color: 'gray', paddingBottom: 6},
                    ]}>
                    Task Requirement
                  </Text>
                  <View>
                    <Text
                      style={[styles.text_congratulation, {textAlign: 'left'}]}>
                      Lorem ipsum dolor sit amet consectetur. Aliquet facilisis
                      diam velit sit sed ac. Eu proin ut nec id mauris lacus
                      augue. Ac libero diam non blandit. Egestas id sit sapien
                      rhoncus. Pellentesque egestas a viverra egestas
                      ullamcorper feugiat justo integer fusce. Urna etiam massa
                      dignissim viverra nisi. Dui erat diam pulvinar tellus
                      morbi.
                    </Text>
                  </View>
                </View>
                <View style={styles.main_box_card}>
                  <Text
                    style={[
                      styles.main_box_card_title,
                      {color: 'gray', paddingBottom: 6},
                    ]}>
                    Report
                  </Text>
                  <View style={styles.report_box}>
                    <View
                      style={[
                        styles.report_box_inner,
                        {backgroundColor: '#199b2142'},
                      ]}>
                      <Image
                        style={styles.thander_icon}
                        source={require('../../assets/images/ic_round-flag.png')}
                      />
                      <Text
                        style={[
                          styles.report_box_inner_number,
                          {color: '#199B21'},
                        ]}>
                        120
                      </Text>
                      <Text style={styles.report_box_inner_text}>
                        total Conversion
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.report_box_inner,
                        {backgroundColor: '#d6831740'},
                      ]}>
                      <Image
                        style={styles.thander_icon}
                        source={require('../../assets/images/mdi_thunder.png')}
                      />
                      <Text
                        style={[
                          styles.report_box_inner_number,
                          {color: '#D68317'},
                        ]}>
                        120
                      </Text>
                      <Text style={styles.report_box_inner_text}>
                        No of Click
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.report_box_inner,
                        {backgroundColor: '#852dfd36'},
                      ]}>
                      <Image
                        style={{width: 20, height: 25}}
                        source={require('../../assets/images/rupee1.png')}
                      />
                      <Text
                        style={[
                          styles.report_box_inner_number,
                          {color: '#852DFD'},
                        ]}>
                        120
                      </Text>
                      <Text style={styles.report_box_inner_text}>
                        total Payout
                      </Text>
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

  text_reactout: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 500,
    lineHeight: 25,
  },

  need_help_icon: {
    width: 100,
    height: 100,
  },
  link_box_style: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  user_image: {
    width: 50,
    height: 50,
  },
  link_box_inner_style: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  link_inner_gray_box: {
    flexBasis: '80%',
    backgroundColor: '#CFE8FF',
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 4,
  },
  link_inner_gray_box_text: {
    flexBasis: '80%',
    fontSize: 14,
    lineHeight: 20,
  },
  user_image: {
    width: 60,
    height: 60,
  },
  total_earning_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 8,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.8,
  },
  total_earning_box_text: {
    fontSize: 20,
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  total_earning_boxamount: {
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 1,
    color: '#0A8AFF',
  },
  report_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',

    flexDirection: 'row',
    gap: 10,
  },
  report_box_inner: {
    flexBasis: '30%',
    padding: 5,
    height: 140,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  thander_icon: {
    width: 40,
    height: 40,
  },
  report_box_inner_number: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 5,
    marginTop: 5,
  },
  report_box_inner_text: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 15,
  },
});

export default AfterAcceptancePerformance;