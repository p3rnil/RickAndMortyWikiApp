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
  Animated,
} from 'react-native';
import {
  useCharactersState,
  useCharactersDispatch,
  getCharacters,
  getMoreCharacters,
} from '../context';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SearchList = ({navigation}) => {
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
    setFilter({name: ''});
    await getCharacters(charactersDispatch, page.current, {name: ''});
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
      return (
        <ActivityIndicator style={styles.activityIndicator} color="tomato" />
      );
    } else {
      return null;
    }
  }, [isLoadingMore]);

  const onPress = useCallback((id) => {
    navigation.navigate('CharacterDetail', {id});
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const y = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  return (
    <View style={[styles.view]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input]}
          placeholderTextColor="grey"
          onSubmitEditing={({nativeEvent}) => fetchData()}
          onChangeText={(text) => setFilter({name: text})}
          placeholder={'Search...'}
          autoCorrect={false}
          clearTextOnFocus={true}
          value={filter.name}
        />
      </View>
      {!isFirstLoading ? (
        <AnimatedFlatList
          {...{onScroll}}
          scrollEventThrottle={16}
          style={styles.list}
          data={characters.results}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <CharacterCard
              {...{
                data: item,
                y,
                onPress: () => onPress(item.id),
                index: index,
              }}
            />
          )}
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
    paddingTop: 15,
  },
  inputWrapper: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 100,
    padding: 15,
    color: 'black',
  },
  list: {
    paddingHorizontal: 15,
  },
  activityIndicator: {
    marginVertical: 15,
  },
});

export default SearchList;
