import {matchSorter} from 'match-sorter';

export const search = (arr, query, searchBy) => {
  if (!query) {
    return arr;
  } else if (!searchBy) {
    const updatedArr = arr.filter((prod) => {
      return prod?.label.toLowerCase().includes(query.toLowerCase());
    });
      console.log(updatedArr)
    return updatedArr;
  } else {
    const updatedArr = arr.filter((prod) => {
      return prod[searchBy].toLowerCase().includes(query.toLowerCase());
    });
    return updatedArr;
  }
};

 export const fuzzySearch = (options,  inputValue ) => {
    return matchSorter(options, inputValue, { keys: ['label','category'] });
  };
