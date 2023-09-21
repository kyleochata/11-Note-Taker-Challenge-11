const { uuid } = require('uuidv4');
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const { deletion } = require('./public/assets/js/delete');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//html routes: GET: /notes => notes.html & * => index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
)


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
)

//GET: /api/notes ==> read db.json ==> return all notes as JSON
app.get('/api/notes', async (req, res) => {
  try {
    const data = await fs.readFileSync('./db/db.json', 'utf-8');
    const notesArr = JSON.parse(data);
    return res.json(notesArr);
  } catch (err) {
    return res.status(500).json('Error in receiving notes');
  }
})

//POST: /api/notes ==> receive new note to save on req body => add to db.json => return new note to client => must give new note a unique id
app.post('/api/notes', async (req, res) => {
  try {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid()
      }

      const data = await fs.readFileSync('./db/db.json', 'utf-8');
      const dataArr = JSON.parse(data);

      dataArr.push(newNote);

      const stringDataArr = JSON.stringify(dataArr, null, 2);

      await fs.writeFileSync('./db/db.json', stringDataArr);

      console.info(`New ${newNote.title} added to JSON file`)

      const response = {
        status: 'success',
        body: newNote
      }

      return res.status(201).json(response);
    } else {
      return res.status(500).json('Error in posting note')
    }
  }
  catch (err) {
    return res.status(500).json(err)
  }
}
)

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const getData = await fs.readFileSync('./db/db.json', 'utf-8');
    const handleData = JSON.parse(getData);
    const inputId = req.params.id;

    const deletedArr = deletion(handleData, inputId);

    const stringDeletedArr = JSON.stringify(deletedArr, null, 2);

    await fs.writeFileSync('./db/db.json', stringDeletedArr);
    return res.json('ok');
  } catch (err) {
    return res.status(500).json(err)
  }
}
)

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.listen(PORT, () =>
  console.log(`Working at http://localhost:${PORT}`))