/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://github.com/AdelRedaa97/react-native-select-dropdown/blob/master/examples/demo2.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Operations from './src/components/Operations';
import GamePlay from './src/components/GamePlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/blob/RN-Tutorial-20/src/App.js

const Tab = createMaterialBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Guess_Cities') {
              iconName = 'city';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Database') {
              iconName = 'building';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#f0f',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: true,
          labelStyle: {fontSize: 10},
          showIcon: true,
        }}
        // activeColor="#f0edf6"
        // inactiveColor="#3e2465"
        // barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          //componet is where you go to, name is used in navigation
          name="Guess_Cities"
          component={GamePlay}
          // options={{tabBarBadge: 3}}
        />

        <Tab.Screen name="Database" component={Operations} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
