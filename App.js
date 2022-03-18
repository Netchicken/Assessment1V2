/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://github.com/AdelRedaa97/react-native-select-dropdown/blob/master/examples/demo2.js
import React, {useState, useEffect, useRef} from 'react';
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
  const [allData, setAllData] = useState([]); //all the data of the countries
  const [gameData, setGameData] = useState({
    CountryName: 'Start',
    CapitalName: 'Start',
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: 'Start',
  }); //holds the selected country details

  const [selectedCity, setSelectedCity] = useState(null); //selected city
  const [allCities, setAllCities] = useState([]); //dropdown data
  const [number, setNumber] = useState(0); //random number
  const [winLose, setWinLose] = useState('false');
  const [selectionTrigger, setSelectionTrigger] = useState(false);
  const citiesDropdownRef = useRef({});

  //this run only at the initial stage, AFTER the dom has loaded ,[] at the end makes it run once
  useEffect(() => {
    //https://javascript.plainenglish.io/what-is-the-equivalent-of-the-componentdidmount-method-in-a-react-function-hooks-component-703df5aed7f6
    //https://dmitripavlutin.com/react-useeffect-explanation/
    //https://daveceddia.com/useeffect-hook-examples/

    const fetchData = () => {
      setAllData(countryDataSmall);
      const data = allData.flatMap(item => item.CapitalName).sort();
      setAllCities(data);
      console.log('allcities useEffect', allCities);
    };

    fetchData();
  }, []);

  // this runs whenever selectedcity changes
  useEffect(() => {
    //  console.log('CheckForWinnerLoser In UseEffect', selectedCity);
    //   selectedCity === null ? '' : CheckForWinnerLoser();
    //  const data = allData.flatMap(item => item.CapitalName).sort();
    // setAllCities(data);
  }, [selectedCity]);

  const CheckForWinnerLoser = () => {
    console.log('gameData.CapitalName', gameData.CapitalName);
    console.log('selectedCity', selectedCity);

    if (selectedCity != null && gameData.CapitalName !== null) {
      if (selectedCity == gameData.CapitalName) {
        // setWinLose('true');
        showToastWithGravity('You win the city is ' + selectedCity);
      } else {
        // setWinLose('false');
        showToastWithGravity(
          'You are wrong the city is ' +
            gameData.CapitalName +
            ' you said ' +
            selectedCity,
        );
      }
    }
  };

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
    //  setSelectionTrigger[false];
    console.log('onClickHandler', 'triggered');

    //setSelectedCity(null);
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
    console.log('allcities', allCities);
  };
  const onClickSubmit = () => {
    // selectedCity === null
    //   ? showToastWithGravity('First choose a city then click the button')
    //   : CheckForWinnerLoser();

    CheckForWinnerLoser();
    citiesDropdownRef.current.reset();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Section
        style={styles.sectionTitle}
        title="Test your City knowledge"></Section>
      <Button title="Choose a random Country" onPress={onClickHandler}></Button>

      <SelectDropdown
        ref={citiesDropdownRef}
        data={allCities}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={'Select city'}
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

      <Button title="Submit your answer" onPress={onClickSubmit}></Button>
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
