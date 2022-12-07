const mongoose = require('mongoose');
const _ = require('underscore');

let NoteModel = {};

const setTitle = (title) => _.escape(title).trim();
const setLocation = (location) => _.escape(location).trim();
const setBody = (body) => _.escape(body).trim();

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
    unique: true,
  },
  location: {
    type: String,
    trim: true,
    set: setLocation,
  },
  body: {
    type: String,
    trim: true,
    set: setBody,
  },
  finishDate: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  location: doc.location,
  body: doc.body,
  finishDate: doc.finishDate,
});

NoteSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return NoteModel.find(search).select('title location body finishDate').sort({finishDate:1}).lean().exec(callback);
};

NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;
