import React, {useState, useEffect, useRef} from 'react';
import countryData from '../../assets/cities';
import SQLite from 'react-native-sqlite-storage';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
//import GamePlay from './GamePlay';

//https://github.com/Shahid313/react-native-sqlite-storage/blob/main/screens/HomeScreen.js

//https://github.com/mahdi-sharifimehr/RN-Tutorial-Main/blob/RN-Tutorial-18/src/ScreenB.js

//https://www.youtube.com/watch?v=ANdSdIlgsEw  database creation
//github.com/mahdi-sharifimehr/RN-Tutorial-Main/tree/RN-Tutorial-25 database creation
const db = SQLite.openDatabase(
  {
    name: 'Store.db',
    location: '~android/app/src/main/assets/',
  },
  () => {
    console.log('Operations DB open exists', 'success');
  },
  error => {
    console.log('Operations DB open error', error);
  },
);

export default function Operations({navigation, route}) {
  const [cities, setCities] = useState([]);
  const [updateCity, setUpdateCity] = useState('');

  useEffect(() => {
    console.log('Operations Useffect', 'success');
    // createTable();
    selectDataHandler();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, City TEXT);',
      );
    });
    //From DBBrowser creation
    // CREATE TABLE "Users"(
    // 	"ID"	INTEGER,
    // 	"City"	TEXT,
    // 	PRIMARY KEY("ID" AUTOINCREMENT)
    // );
    const fakeCity = 'Fake Hamilton'; //sqlite INSERT INTO Users (City) VALUES ("fakeCity")
    db.transaction(async tx => {
      await tx.executeSql('INSERT INTO users (City) VALUES (' + fakeCity + ')');
    });
  };

  const selectDataHandler = () => {
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

    console.log('Operations selectDataHandler', 'click');
    db.transaction(tx => {
      tx.executeSql('SELECT City FROM Users', [], (tx, results) => {
        var len = results.rows.length;
        console.log('Operations selectDataHandler len', len);
        if (len > 0) {
          // var city = results.rows.item(0).City;
          setCities(results);
          console.log('Operations selectDataHandler', results);
        }
      });
    });
  };

  const updateData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users SET City = ?',
        [updateCity],
        () => {
          Alert.alert('Success!', 'The update was succesful');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const removeData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Users',
        [],
        () => {
          // navigation.navigate('SignIn');
        },
        error => {
          error;
        },
      );
    });
  };

  const onPressHandler = () => {
    //  navigation.navigate('Guess_Cities');
    navigation.goBack();
    // navigation.setParams({ ItemId: 14 });
  };

  return (
    <View>
      <View style={styles.body}>
        {/* <View> */}
        {/* <Text>{City}</Text> */}

        {/* <TextInput placeholder="City" onChangeText={e => setUpdateCity(e)} />
          <TouchableOpacity
            onPress={() => updateData()}
            style={styles.UpdateButton}>
            <Text style={styles.UpdateButtonText}>UPDATE</Text>
          </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => selectDataHandler()}
          style={styles.UpdateButton}>
          <Text style={styles.UpdateButtonText}>Show Cities</Text>
        </TouchableOpacity>

        <ScrollView>
          {cities.map((item, index) => {
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
        {/* <TouchableOpacity
            onPress={() => removeData()}
            style={styles.DeleteButton}>
            <Text style={styles.DeleteButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View> */}

        {/* <Pressable
          onPress={onPressHandler}
          style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
          <Text style={styles.text}>Go Back to GamePlay</Text>
        </Pressable> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
  },

  UpdateButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpdateButtonText: {
    color: '#fff',
  },
  DeleteButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeleteButtonText: {
    color: '#fff',
  },
});

//create a table if it doesn't exist Table name = store fileds ID City Date
// const createDBTable = () => {

//   console.log('Operations createDBTable', 'createDBTable');
//    db.transaction((tx => {
//      tx.executeSql(
//        'CREATE TABLE IF NOT EXISTS Store (Id	INTEGER NOT NULL UNIQUE,	City	TEXT,		PRIMARY KEY(Id AUTOINCREMENT)',

//   const results = 'no data';
//   try {
//     const insertQuery =
//       'INSERT INTO Store (City,Date) VALUES  (Hamilton, Christchurch)';
//     db.executeSql(insertQuery);
//     console.log('Insert at create table', insertQuery);
//     results = db.executeSql('SELECT rowid as id, City FROM Store');
//   } catch (error) {
//     console.error('cityitems not inserting ', results);
//     throw Error('cityitems not inserting');
//      }
//    );
//    });
// };

// const getCities = db => {
//   try {
//     const cityItems = [];
//     const results = db.executeSql('SELECT rowid as id, City FROM Store');
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         cityItems.push(result.rows.item(index));
//       }
//     });
//     return cityItems;
//   } catch (error) {
//     console.error('cityitems not parsing ', error);
//     throw Error('Failed to get cityItems !!!');
//   }
// };
// //`INSERT INTO store values` + cityItem;
// //cityItems.map(i => `(${i.id}, '${i.value}')`).join(',');
// const saveCities = cityItem => {
//   const insertQuery =
//     'INSERT INTO Store (City,Date) VALUES  (' + cityItem + ',)';
//   console.error('Insert', cityItem);
//   return db.executeSql(insertQuery);
// };

// async function deleteCity(id) {
//   const deleteQuery = `DELETE from Store where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// }

//};

//}
//==============================================

// export function LoadAllCities() {
//   return countryData;
// }

// export function DatabaseOperations() {}
