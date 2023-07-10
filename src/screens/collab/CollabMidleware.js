import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet, Image, TextInput, Alert } from 'react-native';
// import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';
import { Loader } from 'react-native-feather';
import axios from 'axios';
import request from '../../utils/request'
import CustomWebView from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';
const ENDPOINT = '/campaigndetail/campaign';
const CollabMiddleware = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const deviceType = Platform.OS == 'ios' ? 4 : 3;
    const userToken = useSelector(state => state.user.userToken);
    const userInfo = useSelector(state => state.user.userInfo);



    const getDetails = () => {

        axios.post(Config.API_URL + ENDPOINT, {
            'apiAuth': Config.API_AUTH,
            'slug': route.params.campaign_slug,
            'device_type': deviceType,
        }, {
            headers: {
                Authorization: userToken,
            },
        }).then(({ data }) => {
            console.log('campDetails', data);
            if (data.code == 1 && data.error == 0) {

                if (data.response.campaign.cam_status == 'Approved' && data.response.campaign.cam_type == '2') {
                    Alert.alert('Campaign view is performance');
                }
                else if (data.response.campaign.cam_status == 'Approved' && (data.response.campaign.cam_type == '1' || data.response.campaign.cam_type == '3')) {
                    Alert.alert('Campaign view is paid/barter');
                }
                else {
                   navigation.navigate({ name: 'Collabdetails', params: { campaign_slug: route.params.campaign_slug}});
                }
            }
            else {
                navigation.navigate('Home');
            }
            // setLoading(false);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {

        });
    };

    useEffect(() => {
        getDetails();
        console.log('campSugData', route.params.campaign_slug);
    }, [route.params.campaign_slug, navigation, isFocused]);


};

export default CollabMiddleware;
