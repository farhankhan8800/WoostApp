import React, {useRef, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';
const OTPin = props => {
  const refs = useRef([]);
  const arr = Array.from(Array(props.in));
  const [p, setp] = useState(arr);
  return (
    <>
      <View style={[styles.inputBoxContainer, styles.otpBoxContainer]}>
        {arr.map((e, i) => (
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            key={i}
            maxLength={1}
            keyboardType="numeric"
            placeholder="0"
            ref={ref => {
              refs.current[i] = ref;
            }}
            value={p[i]}
            onChangeText={(t) => {
              if (t.length <= 1) {
                let inp = p;
                p[i] = t;
                setp(inp);
              }
              if (t.length === 0) {
                // Clear the OTP value if it becomes empty
                setp(arr);
              }
              if (i + 1 < arr.length && t.length === 1) {
                refs.current[i + 1].focus();
              } else if (t.length === 1) {
                props.onDone(p.join(''));
              }
            }}></TextInput>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputBoxContainer: {
    position: 'relative',
    marginTop: 10,
  },

  inputText: {
    padding: 10,
    borderWidth: inputBox.borderWidth,
    margin: 5,
    borderColor: '#0A8AFF',
    borderRadius: inputBox.borderRadius,
    color: '#333333',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
  },

  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyCenter: 'center',
  },
});

export default OTPin;
