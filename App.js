/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://github.com/AdelRedaa97/react-native-select-dropdown/blob/master/examples/demo2.js
import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Operations from './src/components/Operations';
import GamePlay from './src/components/GamePlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SQLite from 'react-native-sqlite-storage';
// https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/blob/RN-Tutorial-18/src/App.js
//https://www.youtube.com/watch?v=_031dsQNy88&list=PL8kfZyp--gEXs4YsSLtB3KqDtdOFHMjWZ&index=20
const Tab = createMaterialBottomTabNavigator();

//we need to check that there is a dabase here and working before entering the game
const db = SQLite.openDatabase(
  {
    name: 'Store.db',
    location: 'default',
  },
  () => {
    console.log('App DB open exists', 'success');
  },
  error => {
    console.log('App DB open error', error);
  },
);

const App = () => {
  useEffect(() => {
    console.log('App Useffect', 'success');
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, City TEXT);',
      );
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            console.log('App route', route.name);
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
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        // barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen name="Guess_Cities" component={GamePlay} />
        <Tab.Screen name="Database" component={Operations} />
      </Tab.Navigator>
    </NavigationContainer>
    // component is where you go to, name is used in navigation
  );
};
export default App;
