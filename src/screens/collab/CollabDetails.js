import React, { useEffect, useState } from 'react';
import {View, Text,Platform, StyleSheet, Image, TextInput} from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';
import { Loader } from 'react-native-feather';
import axios from 'axios';
import request from '../../utils/request'
import CustomWebView from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';
const ENDPOINT = '/campaigndetail/campaign';
const CollabDetails = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const deviceType = Platform.OS=='ios' ? 4 : 3 ;
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [loading, setLoading] = useState(true);
  const [campdetails, setCampDetails] = useState(false);
  const [socialIcon, setSocialIcon] = useState([]);
  const [deliverables, setDeliverables] = useState([]);


  const getDetails = () => {
    setLoading(true);
    axios.post(Config.API_URL + ENDPOINT, {
        'apiAuth': Config.API_AUTH,
        'slug': route.params.campaign_slug,
        'device_type': deviceType,
    }, {
        headers: {
            Authorization: userToken,
        },
    }).then(({ data }) => {
        console.log('campDetails',data );
        if (data.code == 1 && data.error == 0) 
        {
          setCampDetails(data.response.campaign)
          const socialIcon = data.response.campaign.channel_category.split("|");
          const socialDeliverables = data.response.campaign.cam_deliverable_tag.split("||");
          setSocialIcon(socialIcon)
          setDeliverables(socialDeliverables)
          console.log('socialDeliverables1',socialDeliverables);
          console.log('socialIcon',socialIcon);
          console.log('deliverables1',deliverables);
        }
        // setLoading(false);
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        setLoading(false);
    });
};

  useEffect(() => {
    getDetails();
   console.log('campSugData', route.params.campaign_slug);
  }, [route.params.campaign_slug,navigation,isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>

      {
                    loading ?
                        <View style={styles.loadContainer}>
                            <Loader />
                        </View> :
        <View style={styles.container}>
          <View style={styles.top_header}>
            <Image
              style={styles.top_header_img}
              source={{ uri: campdetails.store_image }}
            />
            <View style={styles.top_header_box}>
              <Text style={styles.top_header_name_title}>{campdetails.title}</Text>
              <View style={styles.top_applid_box}>
              {
              
                  campdetails.cam_status == 'open' ? (
                      <Text style={styles.top_applid_tit}>{campdetails.submission_time}</Text>
                  ) : (
                      <Text style={styles.top_applid_tit}>{campdetails.cam_status}</Text>
                  )
              
          }

            
              </View>
            </View>
          </View>
          <View style={styles.tab_list_con}>
            <TouchableOpacity
              style={[styles.tab_button, styles.tab_button_active]}>
              <Text
                style={[styles.tab_button_text, styles.tab_button_text_active]}>
                Campaign Details
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.tab_button]}>
              <Text style={[styles.tab_button_text]}>Example</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.main_box}>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>Brand Details</Text>
              <View style={styles.line_style}></View>
              <Text style={styles.company_name}>{campdetails.store_name}</Text>
            </View>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>Task Details</Text>
              <View style={styles.line_style}></View>
              <View>
                {/* <Text style={styles.sub_title_card}>
                  Campaing Type ::{' '}
                  <Text style={styles.sub_title_card_name}> Female</Text>
                </Text>
                <Text style={styles.sub_title_card}>
                  Product Name ::{' '}
                  <Text style={styles.sub_title_card_name}> Whatever</Text>
                </Text>
                <Text style={styles.sub_title_card}>
                  Product Link ::{' '}
                  <Text style={styles.sub_title_card_name}> Some Link</Text>
                </Text> */}
                 <CustomWebView style={styles.txtDescription} source={{ html: campdetails.cam_requirement }} />
              </View>
            </View>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>
                Collab Requirements
              </Text>
              <View style={styles.line_style}></View>
              <View>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.sub_title_card}>To Be Posted On - </Text>
                  { 
                  socialIcon.map((item) => {
                    if(item=='youtube')
                    {
                  return (<Image
                    style={styles.share_icon}
                    source={require('../../assets/images/home-youtube.png')}
                  />)
                    }
                    else if(item=='Instagram')
                    {
                  return (<Image
                    style={styles.share_icon}
                    source={require('../../assets/images/home-youtube.png')}
                  />)
                    }
                  
                })
                }
                </View>
                { 
                 deliverables && deliverables.length > 0 ?
                <View>
                  <Text style={styles.sub_title_card}>Deliverables - </Text>
                  <View>
                  { 
                 deliverables && deliverables.length ? 
                 deliverables.map((item) => {
                    const delv = item.split("^");
                    return(<TouchableOpacity style={styles.real_post_box}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={styles.sub_card_real_img}
                          source={require('../../assets/images/bx_movie-play.png')}
                        />
                        <View>
                          <Text style={styles.sub_card_real_title}>
                            {delv[0]}
                          </Text>
                          <Text style={styles.sub_card_real_dur}>
                          {delv[1]}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>);
                  }):null
                }
                  
                    
                  </View>
                </View>
                : null
      }
              </View>
            </View>
            <View style={styles.main_box_card}>
              <Text style={styles.main_box_card_title}>
                Creator Requirements
              </Text>
              <View style={styles.line_style}></View>
              <View>
                {/* <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sub_title_card}>
                    Gander:{' '}
                    <Text style={styles.sub_title_card_name}> Female</Text>
                  </Text>
                  <View style={styles.active_green_circle}></View>
                </View> */}
                {/* <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sub_title_card}>
                    Age-Group:{' '}
                    <Text style={styles.sub_title_card_name}> 24-36</Text>
                  </Text>
                  <View style={styles.active_green_circle}></View>
                </View> */}
                {/* <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sub_title_card}>
                    Follower Range:{' '}
                    <Text style={styles.sub_title_card_name}> 50k-80k</Text>
                  </Text>
                  <View style={styles.active_green_circle}></View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sub_title_card}>
                    Category:{' '}
                    <Text style={styles.sub_title_card_name}>
                      {' '}
                      Fashion, Lifestyle Etc.
                    </Text>
                  </Text>
                  <View style={styles.active_green_circle}></View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sub_title_card}>
                    Location:{' '}
                    <Text style={styles.sub_title_card_name}>
                      {' '}
                      Place1 ,palce 2, place 3
                    </Text>
                  </Text>
                  <View style={styles.active_green_circle}></View>
                </View> */}
                 <CustomWebView style={styles.txtDescription} source={{ html: campdetails.description }} />

              </View>
            </View>
          </View>
          {/* <View style={styles.apply_button_box}>
                <TouchableOpacity
                  style={styles.apply_button}
                  onPress={() =>
                    navigation.navigate({
                      name: 'ApplyCollab',
                      params: { cam_id: campdetails.cam_id },
                    })
                  }
                >
                  <Text style={styles.apply_button_text}>Apply</Text>
                </TouchableOpacity>
              </View> */}
            
            {
  campdetails.can_apply === "yes" ?
    (campdetails.socialProfile === "1" ?
      (
        <View style={styles.apply_button_box}>
          <TouchableOpacity
            style={styles.apply_button}
            onPress={() => navigation.navigate('Socialprofile')}
          >
            <Text style={styles.apply_button_text}>Apply</Text>
          </TouchableOpacity>
        </View>
      )
      :
      (
        <View style={styles.apply_button_box}>
          <TouchableOpacity
            style={styles.apply_button}
            onPress={() =>
              navigation.navigate({
                name: 'ApplyCollab',
                params: { cam_id: campdetails.cam_id },
              })
            }
          >
            <Text style={styles.apply_button_text}>Apply</Text>
          </TouchableOpacity>
        </View>
      )
    )
    : (campdetails.closure_form === '1' ?
      (
        <View style={styles.apply_button_box}>
          <TouchableOpacity
            style={styles.apply_button}
            onPress={() =>
              navigation.navigate({
                name: 'ClosureCollab',
                params: { cam_id: campdetails.cam_id },
              })
            }
          >
            <Text style={styles.apply_button_text}>Closure Apply</Text>
          </TouchableOpacity>
        </View>
      )
      :
      (
        <Text>{campdetails.user_msg}</Text>
      )
    )
}


         
        </View>
}
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
  loadContainer: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  active_green_circle: {
    padding: 7,
    backgroundColor: 'green',
    zIndex: 2,
    marginRight: 10,
    borderRadius: 40,
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
});

export default CollabDetails;
