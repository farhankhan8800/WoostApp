import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CustomLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loding_box}>
        {/* <Image
          style={styles.social_meida_icon}
          source={require('../assets/images/Loadingimage.gif')}
        /> */}
        <Text>TEST</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loding_box: {
    padding: 50,
  },
});

export default CustomLoader;
