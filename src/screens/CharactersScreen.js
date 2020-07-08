/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SearchList from '../components/SearchList';

const CharactersScreen = () => {
  return (
    <SafeAreaView style={styles.view}>
      <SearchList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  input: {paddingHorizontal: 15},
  list: {
    paddingHorizontal: 15,
  },
});

export default CharactersScreen;
