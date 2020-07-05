import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CharactersScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Characters Screen</Text>
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

export default CharactersScreen;
