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
  ToastAndroid,
} from 'react-native';

import {LoadAllCities} from './Operations';
import {countryData} from './cities';
import {countryDataSmall} from './citiesSmall';
import SelectDropdown from 'react-native-select-dropdown';

const App = () => {
  const [allData, setAllData] = useState(countryDataSmall); //all the data of the countries
  const [gameData, setGameData] = useState({
    CountryName: 'aa',
    CapitalName: 'aa',
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: 'aa',
  }); //holds the selected country details

  const [selectedCity, setSelectedCity] = useState('Not selected'); //selected city
  const [allCities, setAllCities] = useState(['fake', 'fake2']); //dropdown data
  const [number, setNumber] = useState(0); //random number
  const [winLose, setWinLose] = useState('false');

  //this run only at the initial stage, AFTER the dom has loaded ,[] at the end makes it run once
  useEffect(() => {
    //https://javascript.plainenglish.io/what-is-the-equivalent-of-the-componentdidmount-method-in-a-react-function-hooks-component-703df5aed7f6

    const data = allData.flatMap(item => item.CapitalName).sort();
    setAllCities(data);
    console.log('allcities useEffect', allCities);
  }, []);

  //this runs on every change in the dom, its checking for a winner
  useEffect(() => {
    if (selectedCity && gameData.CapitalName) {
      if (selectedCity == gameData.CapitalName) {
        setWinLose('true');
        showToastWithGravity('You win the city is ' + selectedCity);
      } else {
        setWinLose('false');
        showToastWithGravity('You aare wrong the city is ' + selectedCity);
      }
    }
    console.log('selectedCity', selectedCity);
    console.log('gameData.CapitalName', gameData.CapitalName);
    console.log('setWinLose', winLose);
  });
  //win lose toast message
  const showToastWithGravity = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  
  //getting the random number to select the current country data
  const GetRandomNUmber = () => {
    var randomNumber = getRandomNumberBetween(0, allData.length);
    setNumber(randomNumber);
      };

  const getRandomNumberBetween = (min, max) => {
    console.log('allData.length', max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const Section = ({children, title}) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
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

  const onClickHandler = () => {
    console.log('onClickHandler', 'index');
    GetRandomNUmber(); 
    allData.map((item, id) => {
      var selecteditem = allData[number]; //get the data at that point

      setGameData({
        CountryName: selecteditem.CountryName,
        CapitalName: selecteditem.CapitalName,
        CapitalLatitude: selecteditem.CapitalLatitude,
        CapitalLongitude: selecteditem.CapitalLongitude,
        ContinentName: selecteditem.ContinentName,
      });
    });
    console.log('Random number', number);
    console.log('Country Data', allData[number]);
    // var data = allData.flatMap(item => item.CapitalName);
    // setAllCities(data);
    // console.log('allcities', allCities);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Section
        style={styles.sectionTitle}
        title="Test your City knowledge"></Section>
      <Button title="Guess the Capital City" onPress={onClickHandler}></Button>

      <SelectDropdown
        data={allCities}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          setSelectedCity(selectedItem);

          //https://www.npmjs.com/package/react-native-select-dropdown
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
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

//  const sampleData = [
//     {
//       CountryName: 'Somaliland',
//       CapitalName: 'Hargeisa',
//       CapitalLatitude: 9.55,
//       CapitalLongitude: 44.05,
//       ContinentName: 'Africa',
//     },
//     {
//       CountryName: 'South Georgia and South Sandwich Islands',
//       CapitalName: 'King Edward Point',
//       CapitalLatitude: -54.283333,
//       CapitalLongitude: -36.5,
//       ContinentName: 'Antarctica',
//     },
//     {
//       CountryName: 'French Southern and Antarctic Lands',
//       CapitalName: 'Port-aux-Français',
//       CapitalLatitude: -49.35,
//       CapitalLongitude: 70.216667,
//       ContinentName: 'Antarctica',
//     },
//     {
//       CountryName: 'Palestine',
//       CapitalName: 'Jerusalem',
//       CapitalLatitude: 31.76666667,
//       CapitalLongitude: 35.233333,
//       ContinentName: 'Asia',
//     },
//   ];
