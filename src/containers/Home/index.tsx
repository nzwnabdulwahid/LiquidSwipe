import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';
import { Slide } from './components/Slide';
import Wave, {HEIGHT, MARGIN_WIDTH, MIN_LEDGE, Side, WIDTH}  from './components/Wave';
import Color from 'color'
const content = [
  {
    bgColor: 'white',
    textColor: '#05070C',
    primaryText1: 'Quick Wave',
    primaryText2: 'Transfer Note',
    secondary: 'Record oil collections easily and accurately. No more paper!',
    img: require('../../assets/1.png')
  }, {
    bgColor: '#268621',
    textColor: 'white',
    primaryText1: 'Plan',
    primaryText2: 'your route',
    secondary: 'View your collection route. Follow, change or add to your route yourself',
    img: require('../../assets/2.png')
  },
  {
    bgColor: '#05070C',
    textColor: 'white',
    primaryText1: 'Invite',
    primaryText2: 'restaurants',
    secondary: 'Know some restaurant who want to optimize oil collection? Invite them with one click',
    img: require('../../assets/3.png')
  }
]

export const Home: React.FC<{}> = ({children}) => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const next = activeIndex + 1 === 3 ? 0 : activeIndex + 1
  const positionStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(activeIndex === 0 ? 0 : 15 * activeIndex, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    }
  })
  
  return (
    <>
      <Slider 
        key={activeIndex}
        index={activeIndex} 
        setIndex={setActiveIndex} 
        current={<Slide content={content[activeIndex]}/>}
        next={<Slide content={content[next]} />} 
      />
      <View style={{position:'absolute', zIndex:9, flexDirection:'row', bottom:50, left:20}}>
          <View style={{height:10, width:10, borderRadius:5, backgroundColor:activeIndex === 0 ? 'lightgray' : Color(content[activeIndex].bgColor).darken(0.9).toString(),marginRight:5}}/>
          <View style={{height:10, width:10, borderRadius:5, backgroundColor:activeIndex === 0 ? 'lightgray' : Color(content[activeIndex].bgColor).darken(0.9).toString(),marginRight:5}}/>
          <View style={{height:10, width:10, borderRadius:5, backgroundColor:activeIndex === 0 ? 'lightgray' : Color(content[activeIndex].bgColor).darken(0.9).toString(),marginRight:5}}/>
          <Animated.View style={[{position:'absolute', backgroundColor:content[activeIndex].textColor, height:10, width:10, borderRadius:5}, positionStyle]}>
            
          </Animated.View>
      </View>
    </>
      
  );
};

interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  current: JSX.Element,
  next: JSX.Element
}

const Slider = ({index, setIndex, current, next} : SliderProps) => {
  const isTransitioning = useSharedValue(false)
  const right = useVector(0, HEIGHT / 2);

  useEffect(() => {
    right.x.value = withSpring(MIN_LEDGE);
  }, [right.x]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({x, y}, ctx) => {
      right.x.value = WIDTH - x;
      right.y.value = y;
    },
    onEnd: ({x,velocityX, velocityY}, ctx) => {
      const snapPoints = [WIDTH - MIN_LEDGE, 0];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitioning.value = dest === 0;
        right.y.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioning.value ? true : false,
            restSpeedThreshold: isTransitioning.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioning.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioning.value) {
              runOnJS(setIndex)(index + 1 === 3 ? 0 : index + 1);
            }
          },
        );
    }
  })

  return <PanGestureHandler onGestureEvent={onGestureEvent}>
    <Animated.View style={{...StyleSheet.absoluteFillObject,}}>
    {current}
    {next && (
          <View style={StyleSheet.absoluteFill}>
            <Wave
              side={Side.RIGHT}
              position={right}
              isTransitioning={isTransitioning}>
              {next}
            </Wave>
          </View>
        )}
        
  </Animated.View>
  </PanGestureHandler>
}




