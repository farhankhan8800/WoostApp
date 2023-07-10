import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {
  Grid,
  ShoppingBag,
  Home as HomeIcon,
  Users,
  User,
  Percent,
  PhoneCall,
  HelpCircle,
  LogOut,
  Tag,
} from 'react-native-feather';
import Home from '../screens/Home';
import Onboard from '../screens/Onboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// WithdrawMoney

import {useIsFocused} from '@react-navigation/native';
// import RNRestart from 'react-native-restart';
// WithdrawMoney
import {View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import FPL from '../screens/Fpl';
//WithDrawRefferal
// import WithdrawRefferal from '../screens/Dashboard/WithdrawRefferal';
// import ChangePassword from '../screens/Dashboard/ChangePassword';
// import { useSelector } from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import {ShoppingCart} from 'react-native-feather';
import Profile from '../screens/Profile';
import OTP from '../screens/Otp';
import SignUp from '../screens/Signup';
import SplashScreen from '../screens/Splash';
import EnterOTP from '../screens/Otp';
import SocialProfile from '../screens/SocialProfile';
import UserProfile from '../screens/UserProfile';
import {Text} from 'react-native-svg';

//Icons

import Hometab from '../assets/images/bottom-tabs/home.png';
import Collab from '../assets/images/bottom-tabs/collabs.png';
import Earning from '../assets/images/bottom-tabs/earning.png';
import Menu from '../assets/images/bottom-tabs/menu.png';
import MyEarning from '../screens/dashboard/MyEarning';
import WithdrawAmount from '../screens/WithdrawAmount';
import EarningHistory from '../screens/dashboard/EarningHistory';
import WithdrawHistory from '../screens/dashboard/WithdrawHistory';
import VerifyOtp from '../screens/dashboard/VerifyOtp';
import BankList from '../screens/account/BankList';
import AddBank from '../screens/account/AddBank';
import SocialLinkVarifyBottomSheet from '../screens/SocialLinkVerifyBottomSheet';
import CollabDetails from '../screens/collab/CollabDetails';
import PaidCollab from '../screens/collab/PaidCollab';
import PerformanceCollab from '../screens/collab/PerformanceCollab';
import CollabMiddleware from '../screens/collab/CollabMidleware';
import ClosureCollab from '../screens/collab/ClosureCollab';
import ApplyCollab from '../screens/collab/ApplyCollab';
import Notifications from '../screens/Notifications';
const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {
  const isFocused = useIsFocused();
  // const startReload = ()=> RNRestart.Restart();

  // const userToken = useSelector(state => state.user.userToken);
  const horizontalAnimation = {
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  const [refresh, setReferesh] = useState(false);

  const onRefresh = () => {
    console.log('Tets');
    setReferesh(true);
    setTimeout(() => {
      setReferesh(false);
    }, 2000);
  };
  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      navigation={navigation}
      screenOptions={{
        tabBarShowLabel: true,
        headerStyle: {
          backgroundColor: '#f27935',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '900',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 8,
          paddingBottom: 2,
          fontWeight: '800',
        },

        tabBarStyle: {
          height: 72,
          width: 320,
          marginLeft: 33,
          position: 'absolute',
          // alignItems:'center',
          // paddingBottom:12,
          bottom: 16,

          marginHorizontal: 25,
          borderRadius: 48,
        },
      }}>
      <Tab.Screen
        name="Root"
        component={Home}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarScrollEnabled: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabLink,
                focused ? styles.active : styles.tabLink,
              ]}>
              <Image
                source={Hometab}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: focused ? '#fff' : '#000',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          BottomTabs: false,
          unmountOnBlur: true,
          title: '',
          tabBarScrollEnabled: true,
          tabBarLabel: 'My Collabs',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabLink,
                focused ? styles.active : styles.tabLink,
              ]}>
              <Image
                source={Collab}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: focused ? '#fff' : '#000',
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.backArrow}>
                <Image
                  source={require('../assets/images/backArrow.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Login1"
        component={Profile}
        options={{
          BottomTabs: false,
          title: 'Login',
          // tabBarStyle: {display: 'none'},
          tabBarLabel: 'Wallet',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabLink,
                focused ? styles.active : styles.tabLink,
              ]}>
              <Image
                source={Earning}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: focused ? '#fff' : '#000',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={Profile}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabLink,
                focused ? styles.active : styles.tabLink,
              ]}>
              <Image
                source={Menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: focused ? '#fff' : '#000',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f27935',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '900',
        },
      }}
      initialRouteName={SplashScreen}>
      <Stack.Screen
        name="Splashscreen"
        component={SplashScreen}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false, title: ''}}
      />

      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="Otp"
        component={EnterOTP}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="BottomSheet"
        component={SocialLinkVarifyBottomSheet}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="Myearning"
        component={MyEarning}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawAmount}
        options={{headerShown: false, title: ''}}
      />

<Stack.Screen
        name="EarningHistory"
        component={EarningHistory}
        options={{
          headerShown: true,
          title: 'Earning History',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="WithdrawHistory"
        component={WithdrawHistory}
        options={{
          headerShown: true,
          title: 'Withdraw History',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Banklist"
        component={BankList}
        options={{
          headerShown: true,
          title: 'Bank ',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Addbank"
        component={AddBank}
        options={{
          headerShown: true,
          title: 'Bank Account ',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Collabdetails"
        component={CollabDetails}
        initialParams={{ campaign_slug: "" }}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          title: 'Collab Details',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={40}
                height={40}
                source={require('../assets/images/ballnotify.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />

<Stack.Screen
        name="PerformanceCollab"
        component={PerformanceCollab}
        initialParams={{ campaign_slug: "" }}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          title: 'Collab Details',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={40}
                height={40}
                source={require('../assets/images/ballnotify.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PaidCollab"
        component={PaidCollab}
        initialParams={{ campaign_slug: "" }}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          title: 'Details',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={40}
                height={40}
                source={require('../assets/images/ballnotify.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />

<Stack.Screen
        name="ClosureCollab"
        component={ClosureCollab}
        initialParams={{ cam_id: "" }}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          title: 'Closure Collab',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={40}
                height={40}
                source={require('../assets/images/ballnotify.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ApplyCollab"
        component={ApplyCollab}
        initialParams={{ cam_id: "" }}
        options={{
          headerShown: true,
          title: 'Apply Collab',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#222',
          },
          headerLeft: ({tintColor}) => (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={45}
                height={45}
                source={require('../assets/images/back-button.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: ({tintColor}) => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                width={40}
                height={40}
                source={require('../assets/images/ballnotify.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          BottomTabs: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.backArrow}>
                <Image
                  source={require('../assets/images/backArrow.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="OTP" component={OTP} options={{headerShown: false}} />
      <Stack.Screen
        name="Socialprofile"
        component={SocialProfile}
        options={{headerShown: false, title: ''}}
      />

<Stack.Screen
        name="CollabMiddleware"
        component={CollabMiddleware}
        options={{headerShown: false, title: ''}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  active: {
    backgroundColor: '#0070D7',
  },
  tabLink: {
    height: 45,
    width: 45,
    borderRadius: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default AuthStack;
