import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import client from './src/graphql/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {CharactersProvider} from './src/context';
import {CharactersScreen, SettingsScreen} from './src/screens';
import {
  CharacterDetail,
  LocationDetail,
  EpisodeDetail,
} from './src/components/details';

const Tab = createBottomTabNavigator();
const CharactersStack = createStackNavigator();

const CharactersStackScreen = () => {
  return (
    <CharactersStack.Navigator>
      <CharactersStack.Screen
        name="Characters"
        component={CharactersScreen}
        options={{headerShown: false}}
      />
      <CharactersStack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{headerShown: false}}
      />
      <CharactersStack.Screen
        name="LocationDetail"
        component={LocationDetail}
        options={{headerShown: false}}
      />
      <CharactersStack.Screen
        name="EpisodeDetail"
        component={EpisodeDetail}
        options={{headerShown: false}}
      />
    </CharactersStack.Navigator>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CharactersProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Launches"
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Characters') {
                  iconName = focused ? 'ios-list' : 'ios-list';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-settings' : 'ios-settings';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Characters" component={CharactersStackScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </CharactersProvider>
    </ApolloProvider>
  );
};

export default App;
