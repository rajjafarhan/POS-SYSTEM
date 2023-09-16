export const search = (arr, query) => {
  if (!query) {
    return arr;
  } else {
    const updatedArr = arr.filter((prod) => {
      return prod.name.toLowerCase().includes(query.toLowerCase());
    });
    return updatedArr;
  }
};
