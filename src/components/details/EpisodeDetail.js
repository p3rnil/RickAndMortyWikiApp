import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EpisodeDetail = () => {
  return (
    <View style={styles.view}>
      <Text>Episode Detail</Text>
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

export default EpisodeDetail;
