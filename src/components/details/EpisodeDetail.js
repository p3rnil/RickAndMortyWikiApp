import React, {useCallback} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_EPISODE} from '../../graphql';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

const EpisodeDetail = ({navigation, route}) => {
  const {loading, error, data} = useQuery(GET_EPISODE, {
    variables: {id: route.params.id},
  });

  const onPressEpisode = useCallback(
    (id) => navigation.navigate('CharacterDetail', {id: id}),
    [navigation],
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="tomato" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.view}>
        <Text>Unkown data</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={styles.h1} numberOfLines={1} ellipsizeMode="tail">
          {data.episode.name}
        </Text>
        <Text style={styles.h2} numberOfLines={1} ellipsizeMode="tail">
          {data.episode.episode}
        </Text>
        <Text style={styles.h3} numberOfLines={1} ellipsizeMode="tail">
          {data.episode.air_date}
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={data.episode.characters}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <View style={[styles.card]}>
            <TouchableOpacity onPress={() => onPressEpisode(item.id)}>
              <View style={styles.content}>
                <View style={styles.avatar}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
                <View style={styles.info}>
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},

  view: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  h2: {
    fontSize: 25,
    fontWeight: '200',
  },
  h3: {
    fontSize: 20,
    fontWeight: '200',
  },
  list: {
    flex: 1,
    marginTop: 30,
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  container: {
    paddingBottom: 25,
  },
  card: {
    flex: 1,
    maxWidth: Dimensions.get('window').width / 2.22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  content: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 15,
  },
  separator: {
    marginVertical: 5,
  },
});

export default EpisodeDetail;
