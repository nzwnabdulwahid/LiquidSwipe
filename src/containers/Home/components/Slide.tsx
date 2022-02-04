import React, { useMemo, useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
const { width, height } = Dimensions.get("screen");

const SIZE = width - 75;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'red',
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:60
    },
    primary1: {
        fontSize:40,
        fontWeight:'400'
    },
    primary2: {
        fontSize:40,
        fontWeight:'700',
        marginBottom:10
    },
    description: {
        fontSize:16,
        fontWeight:'400'
    },
    image: {
        width: SIZE,
        height: SIZE,
      },
})

export const Slide = ({content}) => {
    return <View style={[styles.container, {backgroundColor: content.bgColor}]}>
        <Image source={content.img} style={styles.image} />
      <Text style={[styles.primary1, {color: content.textColor}]}>{content.primaryText1}</Text>
      <Text style={[styles.primary2, {color: content.textColor}]}>{content.primaryText2}</Text>
      <Text style={[styles.description, {color: content.textColor}]}>{content.secondary}</Text>
    </View>
  }