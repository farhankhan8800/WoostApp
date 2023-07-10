import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { View, Alert, Text, Platform, StyleSheet, Image, TextInput } from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { fontSize, inputBox } from '../../assets/styles/common';

import { RNSVGGroup } from 'react-native-svg';
import { useSelector } from 'react-redux';
import request from '../../utils/request';

import AsyncStorage from '@react-native-async-storage/async-storage';
const END_URL = '/wallet/credit';
const OPTIONS = ["All", "Pending", "Confirm", "Declined"];
const EarningHistory = ({ navigation }) => {
  const deviceType = Platform.OS == 'ios' ? 4 : 3;
  const userToken = useSelector(state => {
    return state.user.userToken;
  });
  const [page, setPage] = useState(1);
  const [option, setOption] = useState('all');
  const [noData, setNoData] = useState();
  const [loader, setLoader] = useState(false);
  const [earningData, setEarningData] = useState([]);
  const getDetails = async () => {
    setLoader(true);
    request.post(navigation, Config.API_URL + END_URL, {
      apiAuth: Config.API_AUTH,
      device_type: deviceType,
      page: page,
      option: option,

    },
      {
        headers: {
          Authorization: userToken,
        },
      }).then(({ data }) => {
        console.log('page',page );
        console.log('page',data );
        if (data.response.txndata.length && data.response.txndata) 
        {
          setEarningData([...earningData, ...data.response.txndata]);
        } 
        else 
        {
            setNoData(true);
        }
        
       

      }).catch((error) => {
        console.log(error);
      });

  };
  useEffect(() => {
    getDetails();
  }, [page, userToken]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.activity_box}>
            <View style={styles.activity_box_top}>
              <Text style={styles.activity_box_top_h}>Activity</Text>

            </View>

            <View>
  {earningData.length && earningData ? (
    earningData.map((item, i) => {
      let status = "";
      if (item.status === '1') {
        status = "Pending";
      } else if (item.status === '2') {
        status = "Confirmed";
      } else if (item.status === '3') {
        status = "Declined";
      }

      return (
        <View style={styles.campan_card} key={i}>
          <View style={styles.campan_card_name_s}>
            <Text style={styles.campan_card_name_t}>{item.store_name}</Text>
          </View>

          <View style={styles.campan_card_name_s}>
            <Text style={styles.campan_card_name_t}>{item.updated_on}</Text>
          </View>

          <View style={styles.campan_card_status}>
            <Text style={styles.campan_card_status_amount}>
              {'\u20B9'}
              {item.amount}
            </Text>
            <Text
              style={[
                styles.campan_card_status_text,
                { color: '#50D200' },
              ]}>
              {status}
            </Text>
          </View>
        </View>
      );
    })
  ) : null}
</View>

    </View>
          {
                noData ? <View style={styles.noDataFound}>
                    <Text>No data Found</Text>
                </View>
                    : <View style={styles.loaderContainer}>
                        <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                            <View>
                                <Text style={styles.loadTxt}>Load More</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
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
  user_details: {
    flex: 1,
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  user_detail_box: {
    paddingLeft: 20,
  },
  user_detail_username: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  user_detail_userearning: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
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
  earning_card_text: {
    color: 'gray',
    fontSize: 15,
  },
  withdraw_button_box: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
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
    fontWeight: 600,
  },
  activity_box: {},
  activity_box_top: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activity_box_top_h: {
    fontSize: 22,
    color: '#222',
    fontWeight: 500,
  },
  activity_box_top_view_all: {
    color: '#0A8AFF',
  },
  activity_box_tab_section: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  activity_box_tab: {
    backgroundColor: '#9ED0FF',
    padding: 8,
    paddingRight: 12,
    paddingLeft: 12,
    marginRight: 15,
    borderRadius: 7,
  },
  activity_box_tab_text: {
    color: '#222',
    fontWeight: 500,
    fontSize: 15,
  },
  campan_card: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  campan_card_image: {},
  campan_card_name_s: {},
  campan_card_name_t: {
    fontSize: 17,
    color: '#222',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  campan_card_name: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  campan_card_status: {},
  campan_card_status_amount: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
  },
  campan_card_status_text: {
    fontSize: 15,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  noDataFound:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
},
loadTxt: {
  fontWeight: 'bold',
  color: '#0A8AFF',
  fontSize: 16,
  textTransform: 'uppercase',
},
loaderContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
LoadMore: {
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#0A8AFF',
  borderWidth: 1,
  paddingHorizontal: 30,
  paddingVertical: 15,
  marginVertical: 25,
},
});
export default EarningHistory;
