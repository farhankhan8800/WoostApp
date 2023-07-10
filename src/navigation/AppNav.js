import React,{useEffect } from 'react';
//import AuthStack from '../navigation/AuthStack';
import { Linking,Alert } from 'react-native';
import Humburger from './humburger';
import {NavigationContainer} from '@react-navigation/native';
const AppNav = ({navigation}) => {
  
  return (
      <NavigationContainer navigation={navigation}>
        <Humburger />
      </NavigationContainer>
  );
};

export default AppNav;

