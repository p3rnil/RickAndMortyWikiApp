/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {CharacterCard} from '../components';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  useCharactersState,
  useCharactersDispatch,
  getCharacters,
  getMoreCharacters,
} from '../context';

const SearchList = () => {
  const page = useRef(1);
  const [filter, setFilter] = useState({name: ''});
  const {characters} = useCharactersState();
  const charactersDispatch = useCharactersDispatch();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchData = useCallback(async () => {
    page.current = 1;
    await getCharacters(charactersDispatch, page.current, filter);
    page.current++;
    setIsFirstLoading(false);
  }, [charactersDispatch, filter]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    page.current = 1;
    await getCharacters(charactersDispatch, page.current, filter);
    page.current++;
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const handleOnEndReached = useCallback(async () => {
    if (!isLoadingMore && page.current <= characters.info.pages) {
      setIsLoadingMore(true);
      await getMoreCharacters(charactersDispatch, page.current, filter);
      setIsLoadingMore(false);
      page.current++;
    }
  }, [characters, charactersDispatch, filter, isLoadingMore]);

  const renderFooter = useCallback(() => {
    // Check If Loading
    if (isLoadingMore) {
      return <ActivityIndicator color="tomato" />;
    } else {
      return null;
    }
  }, [isLoadingMore]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.view]}>
      <TextInput
        style={[styles.input]}
        onSubmitEditing={({nativeEvent}) => fetchData()}
        onChangeText={(text) => setFilter({name: text})}
        placeholder={'Search...'}
        autoCorrect={false}
        clearTextOnFocus={true}
        value={filter.name}
      />
      {!isFirstLoading ? (
        <FlatList
          style={styles.list}
          data={characters.results}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0}
          renderItem={({item}) => <CharacterCard data={item} />}
          ListEmptyComponent={<Text>Empty list</Text>}
          refreshControl={
            <RefreshControl
              tintColor="tomato"
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={renderFooter}
        />
      ) : null}
    </View>
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

export default SearchList;
