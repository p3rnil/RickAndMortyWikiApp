import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EpisodeCard = ({data}) => {
  return (
    <View style={styles.card}>
      <Text>{data.name}</Text>
      <Text>{data.air_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 25,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

export default EpisodeCard;
