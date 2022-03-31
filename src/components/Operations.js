import React, {useState, useEffect, useRef} from 'react';
import countryData from '../../assets/cities';
import SQLite from 'react-native-sqlite-storage';
import {StyleSheet, View, Text, Pressable} from 'react-native';
//import GamePlay from './GamePlay';

//https://github.com/Shahid313/react-native-sqlite-storage/blob/main/screens/HomeScreen.js

export default function Operations({navigation, route}) {
  const [citiesWrong, setCitiesWrong] = useState([]);
  const tableName = 'Store';

  const onPressHandler = () => {
    navigation.navigate('Guess_Cities');
    // navigation.goBack();
    // navigation.setParams({ ItemId: 14 });
  };
  const db = SQLite.openDatabase(
    {
      name: 'Store.db',
      location: 'default',
    },
    () => {
      console.log('Operations DB open exists', 'success');
    },
    error => {
      console.log('Operations DB open error', error);
    },
  );

  useEffect(() => {
    console.log('Operations Useffect', 'success');
    createDBTable();
  }, []);

  //create a table if it doesn't exist Table name = store fileds ID City Date
  const createDBTable = () => {
    db = SQLite.openDatabase(
      {
        name: 'Store.db',
        location: 'default',
      },
      () => {
        console.log('Operations DB open exists', 'success');
      },
      error => {
        console.log('Operations DB open error', error);
      },
    );

    console.log(
      'Operations createTablecreateDBTable',
      'createTablecreateDBTable',
    );
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Store (Id	INTEGER NOT NULL UNIQUE,	City	TEXT,	Date	TEXT,	PRIMARY KEY(Id AUTOINCREMENT)',
      );
    });
    const results = 'no data';
    try {
      const insertQuery =
        'INSERT INTO Store (City,Date) VALUES  (Hamilton, Christchurch)';
      console.error('Insert at create table', 'run');
      db.executeSql(insertQuery);

      results = db.executeSql('SELECT rowid as id, City FROM Store');
    } catch (error) {
      console.error('cityitems not inserting ', results);
      throw Error('cityitems not inserting');
    }
  };

  const getCities = () => {
    try {
      const cityItems = [];
      const results = db.executeSql('SELECT rowid as id, City FROM Store');
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          cityItems.push(result.rows.item(index));
        }
      });
      return cityItems;
    } catch (error) {
      console.error('cityitems not parsing ', error);
      throw Error('Failed to get cityItems !!!');
    }
  };
  //`INSERT INTO store values` + cityItem;
  //cityItems.map(i => `(${i.id}, '${i.value}')`).join(',');
  const saveCities = cityItem => {
    const insertQuery =
      'INSERT INTO Store (City,Date) VALUES  (' + cityItem + ',)';
    console.error('Insert', cityItem);
    return db.executeSql(insertQuery);
  };

  async function deleteCity(id) {
    const deleteQuery = `DELETE from Store where rowid = ${id}`;
    await db.executeSql(deleteQuery);
  }

  return (
    <View>
      <View style={styles.body}>
        <Text style={styles.text}>Operations</Text>
        <Pressable
          onPress={onPressHandler}
          style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
          <Text style={styles.text}>Go Back to GamePlay</Text>
        </Pressable>
      </View>

      {getCities().map(city => (
        <Text>{city.City}</Text>
      ))}
      <Text style={styles.LoginButtonText}>LOGIN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  LoginButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonText: {
    color: '#fff',
  },
});

//};

//}
//==============================================

// export function LoadAllCities() {
//   return countryData;
// }

// export function DatabaseOperations() {}
