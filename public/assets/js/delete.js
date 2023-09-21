const deletion = (arr, id) => {
  return arr.reduce((accum, item) => {
    const objId = item.id;
    if (id !== objId) {
      accum.push(item);
      console.log(accum)
    }
  }, []);
}


const v = [
  {
    title: 'hello me',
    text: 'world',
    id: '6062583c-7402-4821-b3eb-19b30be84fdb'
  },
  {
    title: 'meee',
    text: 'meee',
    id: 'be10c32c-e60a-4354-a6e4-2e97670c00ee'
  },
  {
    title: 'rawr',
    text: 'hello',
    id: 'a50a43b6-e0fa-49dc-8844-52c0e5a6ba83'
  }
]

deletion(v, 'a50a43b6-e0fa-49dc-8844-52c0e5a6ba83');