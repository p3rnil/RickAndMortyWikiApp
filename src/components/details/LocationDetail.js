import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LocationDetail = () => {
  return (
    <View style={styles.view}>
      <Text>Location detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationDetail;
