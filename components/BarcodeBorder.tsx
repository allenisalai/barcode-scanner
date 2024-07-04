import React from 'react';
import {StyleSheet, View} from 'react-native';

type BarcodeBorderProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const BarcodeBorder = (props: BarcodeBorderProps) => {
  return (
    <View style={styles.container(props)}>
    </View>
  );
};

export default BarcodeBorder

const styles = StyleSheet.create({
  container: (props: BarcodeBorderProps) => {
    return {
        left: parseInt(props.x),
        top: parseInt(props.y),
        width: parseInt(props.width),
        height: parseInt(props.height),
        position: 'absolute',
        borderColor: 'red',
        borderWidth: '3px'
    }
  }
});
