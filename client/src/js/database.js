import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log("PUT to the database");
  // connect to jateDB
  const jateDb = await openDB("jate", 1);
  // specify privileges to db
  const tx = jateDb.transaction("jate", "readwrite");
  // open location to store input
  const store = tx.objectStore("jate");
  // make a request variable that updates user content added to db
  const request = store.put({ content: content });
  const result = await request;
  console.log("😎 - Data saved to the database!", result);
};

// TODO: Add logic for a method that gets all the content from the database
// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log("GET All from the database");
  const jateDb = await openDB("jate", 1);
  // instead of readwrite, allow readonly privilege
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // getAll returns all data from store
  const request = store.getAll();
  const result = await request;
  if (result) {
    console.log("result.value", result.content);
    return result.content;
  } else {
    console.error("getDb not implemented");
  }
};

initdb();
