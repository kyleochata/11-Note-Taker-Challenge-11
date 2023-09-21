const deletion = (arr, id) => {
  return arr.reduce((accum, item) => {
    const objId = item.id;
    if (id !== objId) {
      accum.push(item);
      console.log(accum)
    }
    return accum;
  }, []);
}

module.exports = { deletion }
