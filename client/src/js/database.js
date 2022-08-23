import { openDB } from 'idb';

const initdb = async () =>
//creating a new database named 'jate', which will be using version 1 of the database.
  openDB('jate', 1, {
    //add our database schema if it hasn't been initialized yet.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //creating a new object store for the data and giving it a key name of 'id' which automatically increments.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//exporting a function which will use PUT to update database
export const putDb = async (content) => {
  // creates a connection to the database database and version to use
  const jateDB = await openDB("jate", 1);

  // creates a new transaction and specifies the database and data privileges
  const tx = jateDB.transaction("jate", "readwrite");

  // opens up the desired object store
  const store = tx.objectStore("jate");

  // uses the .put() on the store 
  const request = store.put({content});

// gets confirmation of the request
  const result = await request;
 
  console.error('putDb not implemented');
  console.log('🚀 - data saved to the jate store in indexedDb', result);
};

// TODO: Add logic for a method that gets all the content from the database
//exporting a function which will use to GET to the database
export const getDb = async () => {
  console.error('getDb not implemented');
  
  // creates a connection to the database database and the version to use
  const jateDB = await openDB("jate", 1);

  // creates a new transaction and specifies the databse and data privileges.
  const tx = jateDB.transaction("jate", "readonly");

  // opens up the desired object store.
  const store = tx.objectStore("jate");

  // uses the .getAll() methods to get all data in the database
  const request = store.getAll();

  // gets confirmation of the request
  const result = await request; 
  console.log("result.value", result);

};

initdb();
