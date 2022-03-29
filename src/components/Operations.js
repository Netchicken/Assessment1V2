import countryData from '../../assets/cities';
import SQLite from 'react-native-sqlite-storage';

import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage'; //https://blog.logrocket.com/using-sqlite-with-react-native/

const tableName = 'store';
const db = '';
// const db = SQLite.openDatabase(
//   {
//     name: 'MainDB',
//     location: 'default',
//   },
//   () => {},
//   error => {
//     console.log(error);
//   },
// );
//export default function Operations() {

export async function getDBConnection() {
  //enablePromise(true);
  db = SQLite.openDatabase(
    {name: 'store.db', location: 'default'},
    () => {
      console.log('Operations DB open exists', 'success');
    }, //if succesful do nothing
    error => {
      console.log('Operations DB open error', error); //otherwise log error
      createDBTable();
      db = getDBConnection();
    },
  );
  return db;
}

//create a table if it doesn't exist Table name = store fileds ID City Date
export function createDBTable() {
  console.log(
    'Operations createTablecreateDBTable',
    'createTablecreateDBTable',
  );
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'store ' +
        '(ID INTEGER PRIMARY KEY AUTOINCREMENT, City TEXT, Date Text);',
    );
  });
  return db;
}

export async function getTodoItems() {
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
}

export async function saveTodoItems(cityItems) {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    cityItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
}

export async function deleteTodoItem(id) {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
}
//}
//==============================================

// export function LoadAllCities() {
//   return countryData;
// }

// export function DatabaseOperations() {}
