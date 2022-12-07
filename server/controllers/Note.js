const models = require('../models');
const NoteModel = require('../models/Note');

const { Note } = models;

const homepage = (req, res) => res.render('noteApp');

const makeNote = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required!' });
  }

  const noteData = {
    title: req.body.title,
    owner: req.session.account._id,
  };

  if (req.body.location) {
    noteData.location = req.body.location;
  }

  if (req.body.body) {
    noteData.body = req.body.body;
  }

  if (req.body.finishDate) {
    noteData.finishDate = req.body.finishDate;
  }

  try {
    const newNote = new Note(noteData);
    await newNote.save();
    return res.status(201).json({
      title: newNote.title,
      location: newNote.location,
      body: newNote.body,
      finishDate: newNote.finishDate,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Note already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const deleteNote = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'No note specified!' });
  }
  let doc;
  try {
    doc = await NoteModel.findOne({ title: req.body.title }).exec();
  } catch (err) {
    return res.status(400).json({ error: 'An error occurred while finding note.' });
  }

  if (!doc) {
    return res.status(400).json({ error: 'No note found.' });
  }

  try {
    await NoteModel.deleteOne({ title: req.body.title }).exec();
    return res.status(204);
  } catch (err) {
    return res.status(400).json({ error: 'An error occurred while deleting.' });
  }
};

const updateNote = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'No note specified!' });
  }

  let doc;
  try {
    doc = await NoteModel.findOne({ title: req.body.title }).exec();
  } catch (err) {
    return res.status(400).json({ error: 'An error occurred while finding note.' });
  }

  if (!doc) {
    return res.status(400).json({ error: 'No note found.' });
  }

  try {
    doc.title = req.body.title;
    doc.location = req.body.location;
    doc.body = req.body.body;
    doc.finishDate = req.body.finishDate;
    await doc.save();
    return res.json({ redirect: '/home' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getNotes = (req, res) => NoteModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ notes: docs });
});

const notFoundPage = (req, res) => {
  res.render('notFound', { csrfToken: req.csrfToken() });
};

const notFound = (req, res) => res.status(404).json({ error: `${req.path} could not be found.` });

module.exports = {
  homepage,
  makeNote,
  deleteNote,
  updateNote,
  getNotes,
  notFoundPage,
  notFound,
};
