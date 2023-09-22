//helper deletion function for the app.delete server function
//check for each item in the array for it's id and if it matches. If matching don't add to final array
const deletion = (arr, id) => {
  return arr.reduce((accum, item) => {
    const objId = item.id;
    if (id !== objId) {
      accum.push(item);
    }
    return accum;
  }, []);
}

module.exports = { deletion }
