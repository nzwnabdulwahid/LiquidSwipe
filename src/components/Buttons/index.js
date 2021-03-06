import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
const Button = props => {
  const {buttonStyle, textStyle} = styles;
  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#6B7794',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6B7794',
    margin: 5,
    marginRight: 5,
  },
});
export {Button};
