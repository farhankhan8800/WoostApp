import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Modal, StatusBar} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { User, Menu, LogIn, Search} from 'react-native-feather';
const Header = ({ navigation }) => {
const [search, setSearch] = useState(false);
return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#000000" />
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View style={styles.menBox} >
          <Text>
            <Menu style={{ color: '#fff' }} width={20} height={20} />
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.logoCon}>
        <Image source={require('../assets/images/woost-logo.png')} style={styles.fkmLogo} />
      </View>
      <View style={styles.searchArea}>
       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
         <LogIn style={{ color: '#fff', width: 100}} width={22} height={22} />
       </TouchableOpacity>
       


      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
  },
  NoData: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchList:{
    flexDirection: 'row',
    marginTop:10,
    alignItems: 'center',

  },
  filterIcon: {
    width: 18,
    height: 18,
    color: '#333',
    marginRight: 7,
  },
  productName : {
    fontSize:16,
  },
  cashbackamt : {
    fontSize:16,
    color:'green',
    fontWeight:'bold',
  },
  suggestHeading:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'#f27935'
  },
  suggestionCon: {
padding: 20,
  },
  innerSuggestion: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius:6,
  },
  serachCon:{
  position: 'relative',
  backgroundColor: '#fff',
  flex: 1,
  },
  searchAreaCon:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f27935',
    padding: 20,
    height: 130,
    paddingTop: 50,
  },
    searchBox:{
    borderWidth:1,
    borderColor: '#fff',
    borderRadius:6,
    width: '100%',
    padding: 13,
    color:'#fff',
    },
    backButton:{
        width:'10%',
    },
    searchInput: {
        width:'83%',
    },
    backImg: {
        width:25,
        resizeMode: 'contain',
    },
  menBox: {
    marginTop: 4,
  },
  MenuImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  fkmLogo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifaction: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  serchCon: {
    marginRight: 15,
    width: 20,
    height: 20,
  },
  popContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: '100%',
    zIndex: 999,
    width: '100%',
    left: 0,
  },
});
export default Header;
