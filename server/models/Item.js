const mongoose = require('mongoose');
const _ = require('underscore');

let ItemModel = {};

const setName = (name) => _.escape(name).trim();

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  parentList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tierlist',
    require: true,
  },
  votes: {
    type: Number,
    min: 0,
    require: true,
  },
  score: {
    type: Number,
    min: 1,
    max: 6,
    require: true,
  },
  // imageID: {
  //   type: String,
  // }
});

ItemSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  parentList: doc.parentList,
  votes: doc.votes,
  score: doc.score,
});

ItemSchema.statics.findByParentList = (parentList, callback) => {
  const search = {
    // parent: mongoose.Types.ObjectId(ownerId),
  };

  return ItemModel.find(search).select('name parentList votes score').lean().exec(callback);
};

ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
