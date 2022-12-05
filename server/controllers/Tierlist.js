const models = require('../models');
const TierlistModel = require('../models/Tierlist');

const { Tierlist } = models;

const makerPage = (req, res) => res.render('app');

const makeTierlist = async (req, res) => {
  if (!req.body.title || req.body.items.length < 5) {
    return res.status(400).json({ error: 'Title and at least 5 items are required!' });
  }

  for (let i = 0; i < req.body.items.length; i++) {
    const item = req.body.items[i];
    if (!item.name || !item.score) {
      return res.status(400).json({ error: 'Each item must have a name and score!' });
    }
  }

  // not working?
  //   req.body.items.forEach((item) => {
  //     if (!item.name || !item.score) {
  //       return res.status(400).json({ error: 'Each item must have a name and score!' });
  //     }
  //   });

  // make items

  const tierlistData = {
    title: req.body.title,
    votes: 1,
    items: req.body.items, // placeholder, need to use Items saved in server. unless...
    owner: req.session.account._id,
  };

  try {
    const newTierlist = new Tierlist(tierlistData);
    await newTierlist.save();
    return res.status(201).json({ title: newTierlist.title, items: newTierlist.items });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Tierlist already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const updateTierlist = async (req, res) => {
  if (!req.body.title || !req.body.items) {
    return res.status(400).json({ error: 'No list chosen!' });
  }

  let doc;
  try {
    doc = await TierlistModel.findByTitle(req.body.title).exec();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong retrieving the list' });
  }

  if (!doc) {
    return res.status(404).json({ error: 'No list with that name found' });
  }

  // put list updatey stuff here
};

const getTierlist = (req, res) => TierlistModel.findByTitle(req.body.title, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ tierlists: docs });
});

const getLists = (req, res) => TierlistModel.findLists((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ tierlists: docs });
});

const getULists = (req, res) => TierlistModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ tierlists: docs });
});

module.exports = {
  makerPage,
  makeTierlist,
  updateTierlist,
  getTierlist,
  getLists,
  getULists,
};
