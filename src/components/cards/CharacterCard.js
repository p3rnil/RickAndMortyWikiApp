import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CharacterCard = ({data}) => {
  return (
    <View style={[styles.card]}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {data.name}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {data.origin.name}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {data.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    color: 'red',
    marginVertical: 7.5,
    padding: 25,
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
    paddingLeft: 15,
  },
  content: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 250,
  },
  info: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  text: {
    textTransform: 'capitalize',
  },
});

export default CharacterCard;
