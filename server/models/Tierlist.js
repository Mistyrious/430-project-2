const mongoose = require('mongoose');
const _ = require('underscore');

let TierlistModel = {};

const setName = (name) => _.escape(name).trim();

const TierlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
    unique: true,
  },
  votes: {
    type: Number,
    min: 0,
    require: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
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

TierlistSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  votes: doc.votes,
  items: doc.items,
});

TierlistSchema.statics.findLists = (callback) => TierlistModel.find().select('title votes').lean().exec(callback);

TierlistSchema.statics.findByTitle = (title, callback) => {
  const search = {
    title: mongoose.Types.String(title),
  };

  return TierlistModel.find(search).select('title votes items').lean().exec(callback);
};

TierlistSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return TierlistModel.find(search).select('title votes items').lean().exec(callback);
};

TierlistModel = mongoose.model('Tierlist', TierlistSchema);

module.exports = TierlistModel;
