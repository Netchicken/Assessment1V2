import SQLite from 'react-native-sqlite-storage';
import {ToastAndroid} from 'react-native';
const db = {};
export const createOpenDB = () => {
  //open the database ready for operations
  //SQLite.DEBUG(false); //hides annoying errors
  //SQLite.enablePromise(false);

  SQLite.DEBUG(true);
  SQLite.enablePromise(false);

  db = SQLite.openDatabase(
    {
      name: 'Store.db',
      location: 'default', //'~android/app/src/main/assets/www/Store.db',
    },
    () => {
      console.log('GamePlay DB open exists', 'success');
    },
    error => {
      console.log('GamePlay DB open error', error);
    },
  );
};

export const DBInsert = ({selectedCity}) => {
  ToastAndroid.showWithGravity(
    'DBINsert! ' + selectedCity,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );

  db = SQLite.openDatabase({name: 'Store.db', location: 'default'});
  if (selectedCity.length == 0) {
    ToastAndroid.showWithGravity(
      'Warning! selectedCity is empty',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  } else {
    try {
      //  const sqlInsert = console.log('sqlInsert', sqlInsert);
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Users (City) VALUES("${selectedCity}")`, //you must use this structure with executesql not usual sql
          () => {
            ToastAndroid.showWithGravity(
              'Success! ' + selectedCity + ' has been updated to the Database.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          },
          error => {
            ToastAndroid.showWithGravity(
              'Sad! ' + selectedCity + ' has not been updated in the database.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );

            console.log(
              'Saving ' + selectedCity + ' to the db not working',
              error,
            );
          },
        );
      });
    } catch (error) {
      console.log('Saving the city to the db not working', error);
    }
  }
};

export const DBSelect = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT City FROM Users', [], (tx, results) => {
      //var len = results.rows.length;
      console.log('Operations selectDataHandler len', len);
      return results;
      // setCities([]); //empty state
      // for (let i = 0; i < len; i++) {
      //   console.log(
      //     'Operations selectDataHandler results',
      //     results.rows.item(i).City,
      //   );
      //   //get the city
      //   var city = results.rows.item(i).City;
      //   //spread the hook, add in the new city
      //   setCities(cities => {
      //     return [...cities, city];
      //   });
      // }
    });
  });
};

//https://github.com/Chidoge/Chime/blob/3aa990844ef703e6632bbcb34df5105c65a96e9d/src/utility/contactsDatabase.js
export const insertContactData = selectedCity => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({name: 'Store.db', location: 1}).then(DB => {
      DB.executeSql(`INSERT INTO Users (City) VALUES("${selectedCity}")`)
        .then(() => {
          console.log('Contact inserted');
          ToastAndroid.showWithGravity(
            'City inserted',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          resolve(true);
        })
        .catch(e => {
          console.log('Could not insert contact.');
          ToastAndroid.showWithGravity(
            'Could not insert contact.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          reject(e);
        });
    });
  });
};
