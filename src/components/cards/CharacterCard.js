import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const height = Dimensions.get('window').height - 64;

const CharacterCard = ({data, y, onPress, index}) => {
  const position = Animated.subtract(index * (150 + 7.5 * 2), y);
  const isDisappearing = -1 * (150 + 7.5 * 2);
  const isTop = 0;
  const isBottom = height - (150 + 7.5 * 2);
  const isAppearing = height;
  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * (150 + 7.5 * 2)],
      outputRange: [0.00001, -index * (150 + 7.5 * 2)],
      extrapolateRight: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{opacity, transform: [{translateY}, {scale}]}}>
      <TouchableOpacity onPress={onPress}>
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
      </TouchableOpacity>
    </Animated.View>
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
