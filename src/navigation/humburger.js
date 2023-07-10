import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import CustomDrawer from './CustomDrawer';
import Authstack from './AuthStack';
import {Dimensions, Text, View} from 'react-native';

const Humburger = () => {
  return (
    <Drawer.Navigator  drawerContent = {(props) => <CustomDrawer {...props}/>}      screenOptions={{
      drawerStyle: {
        width: Dimensions.get('window').width / 1.15,
      },
    }}>
     <Drawer.Screen name="My Home" component={Authstack} options={{headerShown: false}}/>
    </Drawer.Navigator>
    
  );
};

export default Humburger;
