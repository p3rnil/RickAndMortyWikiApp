import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CharacterDetail = () => {
  return (
    <View style={styles.view}>
      <Text>Character Detail</Text>
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

export default CharacterDetail;
