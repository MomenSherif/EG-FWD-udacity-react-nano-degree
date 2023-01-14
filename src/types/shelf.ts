export const shelfMap = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
};

type Shelf = keyof typeof shelfMap;

export default Shelf;
