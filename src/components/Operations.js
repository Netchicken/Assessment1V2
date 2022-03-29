import countryData from '../../assets/cities';
import SQLite from 'react-native-sqlite-storage';

import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage'; //https://blog.logrocket.com/using-sqlite-with-react-native/

const tableName = 'store';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: 'store.db', location: 'default'},
    () => {}, //if succesful do nothing
    error => {
      console.log('Operations DB open error', error); //otherwise log error
    },
  );
};

//create a table if it doesn't exist Table name = store fileds ID City Date
export const createDBTable = () => {
  return db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'store ' +
        '(ID INTEGER PRIMARY KEY AUTOINCREMENT, City TEXT, Date Text);',
    );
  });
};

export const getTodoItems = async () => {
  try {
    const cityItems = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        cityItems.push(result.rows.item(index));
      }
    });
    return cityItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get cityItems !!!');
  }
};

export const saveTodoItems = async cityItems => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    cityItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async id => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

//==============================================

export function LoadAllCities() {
  return await countryData;
}

export function DatabaseOperations() {}
