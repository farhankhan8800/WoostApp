import React, { useEffect, useState } from 'react';
import { View,Alert, Platform, Text, StyleSheet, Image, TextInput } from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../components/Header';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { fontSize, inputBox } from '../assets/styles/common';
import request from '../utils/request';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const ENDPOINT = '/campaign/home';
const ENDURL = '/campaign/mycolab';
const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const deviceType = Platform.OS == 'ios' ? 4 : 3;
  const [searchData, setSerchData] = useState();
  const [page, setpage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const [mycollabcampaigns, setMycollabCampaigns] = useState([]);
  const [message, setMessage] = useState('');
  const [changeClass, setChangeClass] = useState('newcollab');
  const [newcollabs, setNewcollabs] = useState(true);
  const [mycollabs, setMycollabs] = useState(false);
  const [channels, setChannels] = useState([]);
  const userToken = useSelector(state => state.user.userToken);
  const handalInput = (newSearchData) => {

    setSerchData(newSearchData);

    if (newcollabs) {
      // Filter the campaigns based on the search text
      const filteredCampaigns = campaigns.filter(campaign => {
        // Customize the condition based on your filtering requirements
        return campaign.store_name.toLowerCase().includes(newSearchData.toLowerCase());
      });

      // Update the campaigns state based on the search text
      if (newSearchData !== '') {
        setCampaigns(filteredCampaigns);
      } else {
        // Revert back to the original campaigns data
        setCampaigns(newcollabs);
        // setCampaigns(mycollabs);ds
      }
    }
  };
  const handleTab = action => {
    if (action == 'newcollab') {
      getCampaigns();
      setChangeClass('newcollab');
      setNewcollabs(true);
      setMycollabs(false);
    } else if (action == 'mycollab') {
      setNewcollabs(false);
      setMycollabs(true);
      setChangeClass('mycollab');
      getcollabCampaigns();
    }
  };

  const getCampaigns = () => {
    request
      .post(
        navigation,
        Config.API_URL + ENDPOINT,
        {
          apiAuth: Config.API_AUTH,
          device_type: deviceType,
          page: page,
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
          setCampaigns(data.response.campaigns);
          setNewcollabs(data.response.campaigns);
        } else {
          setMessage('Ooops !! No Data Available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getcollabCampaigns = () => {
    request
      .post(
        navigation,
        Config.API_URL + ENDURL,
        {
          apiAuth: Config.API_AUTH,
          device_type: deviceType,
          page: page,
        },
        {
          headers: {
            Authorization: userToken,
          },
        },
      )
      .then(({ data }) => {
        console.log('mycollab', data);
        if (data.code == 1 && data.error == 0) {
          setMycollabCampaigns(data.response.campaigns);
        } else {
          setMessage('Ooops !! No Data Available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCampaigns();
    console.log('channel',channels)
    console.log('COMPLETE END POINT', Config.API_URL + ENDPOINT);
    console.log('API AUTH ', Config.API_AUTH);
    console.log('DEVICE TYPE ', deviceType);
    console.log('ResponseDataa', campaigns);
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* <Header navigation={navigation} /> */}
          <View style={[styles.top_header_box]}>
            <Text style={[styles.top_header_text, { flex: 3 }]}>
              Perfect Campaigns are waiting for you
            </Text>
            <View style={[styles.notify_icon, { flex: 1 }]}>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Image
                  width={45}
                  height={45}
                  source={require('../assets/images/ballnotify.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.serch_section]}>
            <View style={[styles.serch_section_box]}>
              <Image
                style={[styles.serch_input_icon]}
                width={30}
                height={30}
                source={require('../assets/images/home-search-Icon.png')}
              />
              <TextInput
                autoCapitalize="none"
                style={styles.inputText}
                value={searchData}
                placeholderTextColor="#666"
                onChangeText={handalInput}
                placeholder="What are You Looking For?"
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Myearning')}>
              <Image
                width={30}
                height={30}
                source={require('../assets/images/userhome.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tab_section}>
            <TouchableOpacity
              style={[
                styles.tab_menu_list,
                changeClass == 'newcollab' ? styles.tab_activeTab : '',
              ]}
              onPress={() => handleTab('newcollab')}>
              <Text
                style={[
                  styles.tab_menu_listitem_text,
                  changeClass == 'newcollab'
                    ? styles.tab_menu_listitem_text_active
                    : '',
                ]}>
                New Collabs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab_menu_list,
                changeClass == 'mycollab' ? styles.tab_activeTab : '',
              ]}
              onPress={() => handleTab('mycollab')}>
              <Text
                style={[
                  styles.tab_menu_listitem_text,
                  changeClass == 'mycollab'
                    ? styles.tab_menu_listitem_text_active
                    : '',
                ]}>
                My Collabs
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ width: 100, flex: 1, alignItems: 'flex-end' }}>
              <Image
                width={20}
                height={20}
                source={require('../assets/images/homefilter.png')}
              />
            </TouchableOpacity> */}
          </View>

          {newcollabs ? (
            campaigns.length ? (
              campaigns.map((item, i) => {
                const socialIcon = item.channel_category.split("|");
                return (
                  <View>
                    <View style={styles.collabs_card}>
                      <View style={styles.collabs_card_image}>
                        {/* <Text style={styles.collabs_float_text}>LifeStyle</Text> */}
                        <TouchableOpacity onPress={() => navigation.navigate({ name: 'CollabMiddleware', params: { campaign_slug: item.slug } })}>
                        <Image
                          style={styles.collabs_card_img}
                          source={{ uri: item.home_image }}
                        />
                       </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          padding: 6,
                          paddingLeft: 16,
                          paddingRight: 16,
                          width: '100%',
                        }}>
                        <View style={styles.collab_section_bottom}>
                          <View style={{ flex: 2 }}>
                            <Text style={styles.collab_bottomname}>
                              {item.title}
                            </Text>
                            <Text>{item.store_name}</Text>
                          </View>
                          <View style={styles.collab_section_paid_box}>
                            

                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}>
                           
          <View style={styles.imageContainer}>
          { 
            socialIcon.map((item) => {
              if(item=='youtube')
              {
              return (<Image
              style={styles.share_icon}
              source={require('../assets/images/home-youtube.png')}
              />)
              }
              else if(item=='Instagram')
              {
              return (<Image
              style={styles.share_icon}
              source={require('../assets/images/home-youtube.png')}
              />)
              }
            
          })
          }
          
          </View>
        </View>

                            <Text style={styles.paid_text}>
                              {item.cam_type_name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                          }}>
                          <Text style={styles.apply_text}>
                            Apply By {item.submission_time}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={styles.green_icon}
                              width={30}
                              height={30}
                              source={require('../assets/images/ellipse-home.png')}
                            />
                            <Text style={styles.applicant_text}>
                              {item.applied_user_count} Applicant
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (

              <Text style={styles.oppsNodata}>Oops No Data Found</Text>
            )
          ) : null}

          {
            mycollabs ? (
              mycollabcampaigns.length ? (
                mycollabcampaigns.map((item, i) => {
                const socialIcon = item.channel_category.split("|");

                  return (
                    <View>
                      <View style={styles.collabs_card}>
                        <View style={styles.collabs_card_image}>
                          {/* <Text style={styles.collabs_float_text}>LifeStyle</Text> */}
                          <TouchableOpacity onPress={() => navigation.navigate({ name: 'CollabMiddleware', params: { campaign_slug: item.slug } })}>

                        <Image
                          style={styles.collabs_card_img}
                          source={{ uri: item.home_image }}
                        />
                        </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            padding: 6,
                            paddingLeft: 16,
                            paddingRight: 16,
                            width: '100%',
                          }}>
                          <View style={styles.collab_section_bottom}>
                            <View style={{ flex: 2 }}>
                              <Text style={styles.collab_bottomname}>
                                {item.title}
                              </Text>
                              <Text>{item.store_name}</Text>
                            </View>
                            <View style={styles.collab_section_paid_box}>
                              <Text style={styles.paid_text}>
                                {item.cam_type_name}
                              </Text>

                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                }}>
                            { 
                              socialIcon.map((item) => {
                                if(item=='youtube')
                                {
                              return (<Image
                                style={styles.share_icon}
                                source={require('../assets/images/home-youtube.png')}
                              />)
                                }
                                else if(item=='Instagram')
                                {
                              return (<Image
                                style={styles.share_icon}
                                source={require('../assets/images/home-youtube.png')}
                              />)
                                }
                              
                            })
                            }
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingBottom: 10,
                            }}>
                            <Text style={styles.apply_text}>
                              Application Under Progress
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}></View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.oppsNodata}>Oops No Data Found</Text>
              )
            ) : null
            // changeClass == 'mycollabs' ? (
            //   <View>
            //     <Text style={styles.oppsNodata}>Oops No Data Found</Text>
            //   </View>
            // ) : (
            //   ''
            // )
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
    paddingBottom: 15,
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
  serch_section: {
    flex: 1,
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serch_section_box: {
    position: 'relative',
  },
  inputText: {
    height: 46,
    padding: 10,
    paddingLeft: 47,
    borderWidth: inputBox.borderWidth,
    marginTop: 10,
    borderColor: '#0A8AFF',
    borderRadius: 10,
    color: '#333333',
    width: 300,
    fontSize: 15,
  },
  serch_input_icon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  tab_section: {
    flex: 1,
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab_menu_list: {
    padding: 10,
    paddingLeft: 14,
    borderRadius: 4,
    paddingRight: 15,
  },
  tab_activeTab: {
    backgroundColor: '#0070D7',
  },
  tab_menu_listitem_text: {
    color: '#222',
    fontSize: 17,
  },
  tab_menu_listitem_text_active: {
    color: '#fff',
  },
  collabs_card: {
    width: '100%',
    borderColor: '#222',
    borderWidth: 0.5,
    // elevation: 1,
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  collabs_card_image: {
    position: 'relative',
    width: '100%',
  },
  collabs_card_img: {
    width: '100%',
    overflow: 'hidden',
    height: 200,
  },
  oppsNodata: {
    fontSize: 23,
    fontWeight: 600,
    textAlign: 'center',
    padding: 20,
  },
  noDataFound:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
},
loadTxt: {
  fontWeight: 'bold',
  color: '#f27935',
  fontSize: 16,
  textTransform: 'uppercase',
},
LoadMore: {
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#f27935',
  borderWidth: 1,
  paddingHorizontal: 30,
  paddingVertical: 15,
  marginVertical: 25,
},

  collabs_float_text: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 10,
    paddingBottom: 3,
    paddingTop: 3,
    fontSize: 12,
    color: '#222',
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    zIndex: 1,
  },
  collab_section_bottom: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collab_section_paid_box: {
    flex: 2,
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  collab_bottomname: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  paid_icon: {
    marginRight: 8,
  },
  paid_text: {
    padding: 6,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: '#86B2DA',
    color: '#222',
    borderRadius: 7,
    fontWeight: '600',
  },
  share_icon: {
    width: 40,
    height: 40,
  },
  apply_text: {
    fontSize: 16,
    color: '#0070D7',
    fontWeight: 500,
  },
  green_icon: {
    marginRight: 10,
  },
  applicant_text: {
    fontSize: 15,
  },
});
export default Home;
