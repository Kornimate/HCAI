// services/indexedDBService.js

const DB_NAME = "PixcassoDB";
const STORE_NAME = "imgs";
const DB_VERSION = 1;
const IMG_ID = "img_id"

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function SaveData(blob) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put({ id: IMG_ID, content: blob });
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function GetData() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  return new Promise((resolve, reject) => {
    const request = tx.objectStore(STORE_NAME).get(IMG_ID);
    request.onsuccess = () => resolve(request.result?.content || null);
    request.onerror = () => reject(request.error);
  });
}

export { SaveData, GetData }
