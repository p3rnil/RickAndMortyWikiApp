import React, {useCallback} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_LOCATION} from '../../graphql';
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

const LocationDetail = ({navigation, route}) => {
  const {loading, error, data} = useQuery(GET_LOCATION, {
    variables: {id: route.params.id},
  });

  const onPressCharacter = useCallback(
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
      <View style={[styles.view, styles.center]}>
        <Text style={styles.h1} numberOfLines={1} ellipsizeMode="tail">
          {data.location.name}
        </Text>
        <Text style={styles.h2} numberOfLines={1} ellipsizeMode="tail">
          {data.location.type}
        </Text>
        <Text style={styles.h3} numberOfLines={1} ellipsizeMode="tail">
          {data.location.dimension}
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.h1}>Characters:</Text>
      </View>
      <FlatList
        style={styles.list}
        data={data.location.residents}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <View style={[styles.card]}>
            <TouchableOpacity onPress={() => onPressCharacter(item.id)}>
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
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 15,
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

export default LocationDetail;
