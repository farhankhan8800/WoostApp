import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {useDispatch} from 'react-redux';
import {LOGGEDOUT} from '../redux/actionTypes';
import {useSelector} from 'react-redux';
function SplashScreen({navigation}) {
  const user = useSelector(state => {
    return state.user;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    console.log();
    setTimeout(() => {
      if (user && user.userInfo.profile_completion_level == '0') {
        navigation.navigate('Socialprofile');
      } else if (user && user.userInfo.profile_completion_level == '1') {
        navigation.replace('PerformanceCollab');
        // navigation.replace('Collabdetails');
      } else {
        navigation.replace('Signup');
      }
    }, 2500);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/splash-onboard.gif')}
      style={{flex: 1}}
    />
  );
}
export default SplashScreen;
