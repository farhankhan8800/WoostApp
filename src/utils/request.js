import axios from "axios";
import { LOGGEDOUT } from "../redux/actionTypes";
import { View,Alert, Text, TouchableOpacity, StyleSheet, Image,Linking} from 'react-native';
// import {store} from "../redux/store"

const request = {
    get: async (navigation, url, params, options) => {
       
        const res = await axios.post(
            url,
            { ...params },
            {...options}
        );
        if (res.data && res.data['code'] == 401) {
            // Redirect to login screen
            // store.dispatch({
            //     type: LOGGEDOUT
            // })
        } else {
            return res;
        }
    },

    post: async (navigation, url, data, options) => {
        const res = await axios.post(
            url,
            {...data},
            {...options}
        );
        if (res.data && res.data['code'] == 401) {
            // Redirect to login screen
            store.dispatch({
                type: LOGGEDOUT
            })
            Alert.alert('Session Expired')
            navigation.pop();
            navigation.navigate('Signup')
        } else {
            return res;
        }
    },
};

export default request;
