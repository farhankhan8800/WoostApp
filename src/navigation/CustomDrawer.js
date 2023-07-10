import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import {
  Grid,
  ShoppingBag,
  Percent,
  PhoneCall,
  HelpCircle,
  LogOut,
  Tag,
  Key,
  Home,
} from 'react-native-feather';
import {useDispatch} from 'react-redux';
import {LOGGEDOUT} from '../redux/actionTypes';
import {useSelector} from 'react-redux';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const CustomDrawer = ({navigation}) => {
  const user = useSelector(state => {
    return state.user;
  });

  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      dispatch({
        type: LOGGEDOUT,
        userToken: '',
        userInfo: '',
      });
      navigation.navigate('Signup');
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <View style={{padding: 4, position: 'relative', flex: 1}}>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/images/profile-icon.png')}
          style={styles.imgProfile}
        />

        {user.userInfo ? (
          <View style={styles.profileName}>
            {/* <Text style={{color: 'black'}}>Hii,</Text> */}
            <Text style={styles.pName}>{user.userInfo.phone}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Text style={styles.view_profile}>View Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileName}>
            <Text style={{color: 'black'}}>Hii,</Text>
            <Text style={styles.pName}>Guest</Text>
          </View>
        )}
      </View>
      <View style={styles.humburgerMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menuListCon}>
            <View style={styles.menuIcon}>
              <Image source={require('../assets/images/dHome.png')} />
            </View>
            <View style={styles.menuName}>
              <Text style={styles.menuTxt}>Home</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menuListCon}>
            <View style={styles.menuIcon}>
              <Image source={require('../assets/images/dcollab.png')} />
            </View>
            <View style={styles.menuName}>
              <Text style={styles.menuTxt}>My Collab</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menuListCon}>
            <View style={styles.menuIcon}>
              <Image source={require('../assets/images/dwallet.png')} />
            </View>
            <View style={styles.menuName}>
              <Text style={styles.menuTxt}>My Earning</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menuListCon}>
            <View style={styles.menuIcon}>
              <Image source={require('../assets/images/dfaq.png')} />
            </View>
            <View style={styles.menuName}>
              <Text style={styles.menuTxt}>FAQ</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menuListCon}>
            <View style={styles.menuIcon}>
              <Image source={require('../assets/images/dstar.png')} />
            </View>
            <View style={styles.menuName}>
              <Text style={styles.menuTxt}>Rate Us On Play Store</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logout_box}>
        {user.userInfo ? (
          <View style={styles.menuListCon}>
            <Image
              style={{width: 40, height: 40}}
              source={require('../assets/images/dlogout.png')}
            />
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.logout_text}>Log out</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: 9,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomColor: '#27272',
    borderBottomWidth: 3,
  },
  imgProfile: {
    width: 55,
    height: 55,
    elevation: 5,
    marginRight: 17,
    borderRadius: 100,
  },
  editProfile: {
    position: 'absolute',
    right: 35,
    top: 35,
    zIndex: 999,
    backgroundColor: '#0b8aff',
    borderRadius: 70,
    padding: 8,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edtiTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  pName: {
    color: '#222',
    fontSize: 19,
    fontWeight: '600',
  },
  view_profile: {
    color: '#gray',
    fontSize: 17,
    marginTop: 3,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  humburgerMenu: {
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
  },
  menuIcon: {
    paddingRight: 20,
  },
  menuListCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  menuName: {
    fontSize: 20,
    fontWeight: '500',
  },
  menuTxt: {
    color: '#727272',
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: '500',
  },
  logout_box: {
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
  logout_text: {
    color: '#0A8AFF',
    fontSize: 24,
    paddingLeft: 10,
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default CustomDrawer;