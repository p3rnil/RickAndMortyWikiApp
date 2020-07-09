import React, {useCallback} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_CHARACTER} from '../../graphql';
import {EpisodeCard} from '../cards';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const CharacterDetail = ({navigation, route}) => {
  const {loading, error, data} = useQuery(GET_CHARACTER, {
    variables: {id: route.params.id},
  });

  const toOriginDetail = useCallback(() => {
    if (data?.character?.origin?.id) {
      navigation.navigate('LocationDetail', {id: data.character.origin.id});
    }
  }, [data]);

  const toCurrentLocationDetail = useCallback(() => {
    if (data?.character?.location?.id) {
      navigation.navigate('LocationDetail', {id: data.character.location.id});
    }
  }, [data]);

  const toEpisodeDetail = useCallback((id) => {
    if (id) {
      navigation.navigate('EpisodeDetail', {id});
    }
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="tomato" size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: data.character.image,
            }}
          />
          <Text style={styles.name}>{data.character.name}</Text>
          <Text style={[styles.status, styles.text]}>
            {data.character.status}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Info: </Text>
            <View style={[styles.subSection, styles.horizontal]}>
              <Text
                style={
                  styles.sectionChild
                }>{`Gender:  ${data.character.gender}`}</Text>
              <Text
                style={
                  styles.sectionChild
                }>{`Species:  ${data.character.species}`}</Text>
            </View>
            {data.character.type ? (
              <View style={styles.subSection}>
                <Text>{`Type: ${data.character.type}`}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity onPress={toOriginDetail}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Origin: </Text>
              {data.character.origin.id ? (
                <>
                  <View style={styles.subSection}>
                    <Text>{`Name:  ${data.character.origin.name}`}</Text>
                  </View>
                  <View style={styles.subSection}>
                    <Text>{`Type:  ${data.character.origin.type}`}</Text>
                  </View>
                  <View style={styles.subSection}>
                    <Text>{`Dimension:  ${data.character.origin.dimension}`}</Text>
                  </View>
                </>
              ) : (
                <View style={styles.subSection}>
                  <Text>Unknown</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={toCurrentLocationDetail}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Location: </Text>
              {data.character.location.id ? (
                <>
                  <View style={styles.subSection}>
                    <Text>{`Name:  ${data.character.location.name}`}</Text>
                  </View>
                  <View style={styles.subSection}>
                    <Text>{`Type:  ${data.character.location.type}`}</Text>
                  </View>
                  <View style={styles.subSection}>
                    <Text>{`Dimension:  ${data.character.location.dimension}`}</Text>
                  </View>
                </>
              ) : (
                <View style={styles.subSection}>
                  <Text>Unknown</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Episodes: </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              data={data.character.episode}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => toEpisodeDetail(item.id)}>
                  <EpisodeCard data={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f9f6f4',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  text: {
    textTransform: 'capitalize',
  },
  horizontal: {
    flexDirection: 'row',
  },
  header: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 15,
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderRadius: 5,
    elevation: 1,
  },
  subSection: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionChild: {
    flex: 1,
  },
  image: {
    height: 400,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 20,
    fontWeight: '200',
  },
  separator: {
    marginHorizontal: 5,
  },
  episodeCard: {
    marginHorizontal: 10,
  },
});

export default CharacterDetail;
