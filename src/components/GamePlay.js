//https://github.com/AdelRedaa97/react-native-select-dropdown/blob/master/examples/demo2.js
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Colors,
  Button,
  ToastAndroid,
  Pressable,
} from 'react-native';

import {countryDataSmall, createCities} from '../../assets/citiesSmall';
import SelectDropdown from 'react-native-select-dropdown';
import SQLite from 'react-native-sqlite-storage';
import {OpenDB, DBInsert} from './DBOperations';
SQLite.DEBUG(false); //hides annoying errors
SQLite.enablePromise(false);

export default function GamePlay({navigation, route}) {
  // const {ItemName, ItemId} = route.params;
  // https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/blob/RN-Tutorial-20/src/ScreenA.js

  const [allData, setAllData] = useState(countryDataSmall); //all the data of the countries
  const [gameData, setGameData] = useState({
    CountryName: 'Start',
    CapitalName: 'Start',
    CapitalLatitude: 0,
    CapitalLongitude: 0,
    ContinentName: 'Start',
  }); //holds the selected country details

  const [selectedCity, setSelectedCity] = useState(null); //selected city
  const [allCities, setAllCities] = useState(createCities()); //dropdown data only accepts [] of single data
  const [number, setNumber] = useState(0); //random number
  const [citiesCorrect, setCitiesCorrect] = useState([]);
  const [citiesWrong, setCitiesWrong] = useState([]);
  const citiesDropdownRef = useRef({});

  //this run only at the initial stage, AFTER the dom has loaded ,[] at the end makes it run once
  useEffect(() => {
    //https://javascript.plainenglish.io/what-is-the-equivalent-of-the-componentdidmount-method-in-a-react-function-hooks-component-703df5aed7f6
    //https://dmitripavlutin.com/react-useeffect-explanation/
    //https://daveceddia.com/useeffect-hook-examples/

    const fetchData = () => {
      console.log('useEffect allData ', allData);
      // LoadGamedata();
    };
    fetchData();
  }, []);

  //runs when selectedcity changes
  useEffect(() => {
    console.log('useEffect selectedCity ', selectedCity);
    //need to check all three!!! sigh javascript
    selectedCity === null || selectedCity === undefined || selectedCity === ''
      ? ''
      : CheckForWinnerLoser(); //if there is no city dont run check for winner
  }, [selectedCity]);

  const CheckForWinnerLoser = () => {
    console.log(
      'CheckForWinnerLoser gameData.CapitalName selectedCity',
      gameData.CapitalName + ' ' + selectedCity,
    );

    if (
      selectedCity !== null ||
      selectedCity !== undefined ||
      (selectedCity !== '' && gameData.CapitalName !== 'Start')
    ) {
      if (selectedCity == gameData.CapitalName) {
        //you have a winner

        ToastAndroid.showWithGravity(
          'You win the city is ' + selectedCity,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );

        // pass in the citiescorrect state, spread it,  and pass both to setCitiesCorrect
        setCitiesCorrect(citiesCorrect => {
          return [...citiesCorrect, selectedCity];
        });
      } else {
        // saveCitiesWrong(gameData.CapitalName);

        ToastAndroid.showWithGravity(
          'You are wrong the city is ' +
            gameData.CapitalName +
            ' you said ' +
            selectedCity,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );

        insertData(); //add word to database
        // pass in the citiesWrong state, spread it,  and pass both to setCitiesWrong
        setCitiesWrong(citiesWrong => {
          return [...citiesWrong.reverse(), selectedCity];
        });
      }
    }
  };

  //save wrong city to database
  const insertData = async () => {
    //open the database ready for operations
    OpenDB;

    if (selectedCity.length == 0) {
      //showToastWithGravity('Warning! selectedCity is empty');
      ToastAndroid.showWithGravity(
        'Warning! selectedCity is empty',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      //try {
      DBInsert(selectedCity);
      //  const sqlInsert = console.log('sqlInsert', sqlInsert);
      //     db.transaction(tx => {
      //       tx.executeSql(
      //         'INSERT INTO Users (City) VALUES (?)',
      //         [selectedCity], //you must use this structure with executesql not usual sql
      //         () => {
      //           showToastWithGravityBottom(
      //             'Success! ' +
      //               selectedCity +
      //               ' has been updated to the Database.',
      //           );
      //         },
      //         error => {
      //           showToastWithGravity(
      //             'Sad! ' +
      //               selectedCity +
      //               ' has not been updated in the database.',
      //           );
      //           console.log(
      //             'Saving ' + selectedCity + ' to the db not working',
      //             error,
      //           );
      //         },
      //       );
      //     });
      // } catch (error) {
      //   console.log('Saving the city to the db not working', error);
      // }
    }
  };

  //win lose custom toast message
  // const showToastWithGravity = msg => {
  //   ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  // };
  // const showToastWithGravityBottom = msg => {
  //   ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  // };

  //getting the random number to select the current country data
  const GetRandomNUmber = () => {
    var randomNumber = getRandomNumberBetween(0, allData.length);
    setNumber(randomNumber);
  };

  const getRandomNumberBetween = (min, max) => {
    console.log('getRandomNumberBetween allData.length', max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onClickHandler = () => {
    const data = allData.flatMap(item => item.CapitalName).sort();
    setAllCities(data);
    console.log('onClickHandler', 'triggered');

    LoadGamedata();

    console.log('onClickHandler Random number', number);
    console.log('onClickHandler Country Data', allData[number]);
    // console.log('onClickHandler allcities', allCities);
  };

  const LoadGamedata = () => {
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
    console.log('LoadGamedata', gameData);
  };

  const onClickSubmit = () => {
    CheckForWinnerLoser();
    citiesDropdownRef.current.reset();
  };
  alertItemName = item => {
    alert(item);
  };

  const Section = ({children, title}) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.textSmall}>
         The city is {gameData.CapitalName ? gameData.CapitalName : ''}
        </Text>
        <Text>
          The Country is {gameData.CountryName ? gameData.CountryName : ''}
        </Text>
        <Text>
          The Continent is{' '}
          {gameData.ContinentName ? gameData.ContinentName : ''}
        </Text>
      </View>
    );
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
          setSelectedCity(selectedItem);
        }}
        defaultButtonText={'Choose the city'}
        buttonTextAfterSelection={(selectedItem, index) => {
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

      {/* <Button title="Submit your answer" onPress={onClickSubmit}></Button> */}
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            alignContent: 'space-between',
          },
        ]}>
        <View style={styles.resultcontainer}>
          <ScrollView>
            <Text style={styles.headingoutome}>Correct Cities</Text>
            {citiesCorrect.map((item, index) => {
              return (
                <View>
                  <Text key={index} style={styles.item}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.resultcontainer}>
          <ScrollView>
            <Text
              style={[
                styles.headingoutome,
                {marginLeft: 50, alignSelf: 'flex-end'},
              ]}>
              Wrong Cities
            </Text>
            {citiesWrong.map((item, index) => {
              return (
                <View>
                  <Text
                    key={index}
                    style={[
                      styles.item,
                      {marginLeft: 50, alignSelf: 'flex-end'},
                    ]}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingoutome: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingLeft: 20,
    fontSize: 18,
  },
  sectionContainer: {
    marginTop: 10,
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
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  textSmall: {
    fontSize: 10,
        margin: 5,
  },
});
