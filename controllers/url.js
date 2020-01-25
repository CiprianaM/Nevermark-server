const myUrlModel = require('../models/url');

exports.getAllUrls = async (req, res) => {
  const urls = await myUrlModel.find();
  req.body = urls;
  res.json(req.body);
};
exports.createNewUrl = async (req, res) => {
  const url = await myUrlModel.create({
    title: req.body.title,
    venue: req.body.venue,
    date: req.body.date
  });
  res.status(201);
  res.json(url);
};
exports.deleteUrl = async (req, res) => {
  await myUrlModel.deleteOne({_id: req.params.id});
  res.sendStatus(204);
}

