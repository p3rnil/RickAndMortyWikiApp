import React, {useState, useRef, useEffect, useCallback} from 'react';
import {CharacterCard} from '../components';
import {
  SafeAreaView,
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

const CharactersScreen = () => {
  const page = useRef(1);
  const [filter, setFilter] = useState({});
  const {characters} = useCharactersState();
  const charactersDispatch = useCharactersDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    page.current = 1;
  }, [filter]);

  useEffect(() => {
    getCharacters(charactersDispatch, page.current, filter);
    page.current++;
  }, []);

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
    if (page.current <= characters.info.pages) {
      setIsLoadingMore(true);
      await getMoreCharacters(charactersDispatch, page.current, filter);
      setIsLoadingMore(false);
      page.current++;
    }
  }, [characters]);

  const renderFooter = () => {
    // Check If Loading
    if (isLoadingMore) {
      return <ActivityIndicator color="tomato" />;
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      {characters ? (
        <FlatList
          style={styles.list}
          data={characters.results}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0}
          renderItem={({item}) => <CharacterCard data={item} />}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 15,
  },
});

export default CharactersScreen;
