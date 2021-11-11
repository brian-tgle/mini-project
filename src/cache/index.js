import localForage from 'localforage';

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'expense',
  version: 1.0,
  size: 4980736,
  storeName: 'keyvaluepairs',
  description: 'This Database is for storing the entries responses in the indexedDB'
});

const databases = localForage.createInstance({
  name: 'expense',
  storeName: 'expense'
});

export default databases;
