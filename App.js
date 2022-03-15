/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SectionList,
  Colors,
  Button,
  FlatList,
} from 'react-native';
//import RNPickerSelect from 'react-native-picker-select';

import {LoadAllCities} from './Operations';
import {countryData} from './cities';

const App = () => {
  const [allData, setAllData] = useState(countryData);
  const [gameData, setGameData] = useState({
    CountryName: 'aa',
    CapitalName: 'aa',
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: 'aa',
  });
  //holds the name selected of the capital city
  const [selectedName, setSelectedName] = useState('Not selected');
  const [allCities, setAllCities] = useState();

  // useEffect(() => {
  //   //Runs only on the first render with []

  //   allData.map(() => {
  //     setAllCities(CapitalName);
  //   });

  //   console.log('allCities', allCities);
  // }, []);

  const data = [
    {CapitalName: 'Devin'},
    {CapitalName: 'Dan'},
    {CapitalName: 'Dominic'},
    {CapitalName: 'Jackson'},
    {CapitalName: 'James'},
    {CapitalName: 'Joel'},
    {CapitalName: 'John'},
    {CapitalName: 'Jillian'},
    {CapitalName: 'Jimmy'},
    {CapitalName: 'Julie'},
  ];

  const [number, setNumber] = useState(0);

  const increase = () => {
    var datalength = allData.length;
    var randomNumber = getRandomNumberBetween(0, 20);
    setNumber(randomNumber);
    // number == 14 ? setNumber(1) : setNumber(number + 1);
  };

  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const Section = ({children, title}) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {title} {number}
        </Text>
        <Text>
          the city is {gameData.CapitalName ? gameData.CapitalName : ''}
        </Text>
        <Text>
          the Country is {gameData.CountryName ? gameData.CountryName : ''}
        </Text>
        <Text>
          the Continent is{' '}
          {gameData.ContinentName ? gameData.ContinentName : ''}
        </Text>
      </View>
    );
  };

  const sampleData = [
    {
      CountryName: 'Somaliland',
      CapitalName: 'Hargeisa',
      CapitalLatitude: 9.55,
      CapitalLongitude: 44.05,
      ContinentName: 'Africa',
    },
    {
      CountryName: 'South Georgia and South Sandwich Islands',
      CapitalName: 'King Edward Point',
      CapitalLatitude: -54.283333,
      CapitalLongitude: -36.5,
      ContinentName: 'Antarctica',
    },
    {
      CountryName: 'French Southern and Antarctic Lands',
      CapitalName: 'Port-aux-Français',
      CapitalLatitude: -49.35,
      CapitalLongitude: 70.216667,
      ContinentName: 'Antarctica',
    },
    {
      CountryName: 'Palestine',
      CapitalName: 'Jerusalem',
      CapitalLatitude: 31.76666667,
      CapitalLongitude: 35.233333,
      ContinentName: 'Asia',
    },
  ];

  const onClickHandler = () => {
    increase(); //increase the counter
    // allData.map((item, id) => {
    var selecteditem = allData[number]; //get the data at that point

    setGameData({
      CountryName: selecteditem.CountryName,
      CapitalName: selecteditem.CapitalName,
      CapitalLatitude: selecteditem.CapitalLatitude,
      CapitalLongitude: selecteditem.CapitalLongitude,
      ContinentName: selecteditem.ContinentName,
    });
    var cities = item.CapitalName;
    //setAllCities(cities);
    // });
    console.log('Random number', number);
    console.log('Country Data', allData[number]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Section
        style={styles.sectionTitle}
        title="Guess the Capital City"></Section>
      <Button title="New Country" onPress={onClickHandler}></Button>
      {/* <FlatList
        data={[data]}
        renderItem={({item}) => (
          <Text style={styles.item}>{item.CapitalName}</Text>
        )} 
      />
      //https://github.com/lawnstarter/react-native-picker-select
      <RNPickerSelect
        onValueChange={value => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#0080ff',
    marginHorizontal: 20,
  },
});

export default App;
