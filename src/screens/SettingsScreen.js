import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Settings Screen</Text>
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

export default SettingsScreen;
