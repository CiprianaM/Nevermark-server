const myUrlModel = require('../models/url');

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await myUrlModel.find();
    req.body = urls;
    res.json(req.body);
  } catch (error) {
    res.send({ error: error});
    res.status(500);
  }
};
exports.createNewUrl = async (req, res) => {
  try {
    const url = await myUrlModel.create({
      url: req.body.url,
      fullUrl: req.body.fullUrl,
      fullTitle: req.body.fullTitle,
      text: req.body.text,
      terms: req.body.terms,
      titleTerms: req.body.titleTerms,
      domain: req.body.domain,
      hostname: req.body.hostname,
      screenshot: req.body.screenshot,
      userId: req.body.userId,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      timeSpent: req.body.timeSpent,
    });
    res.status(201);
    res.json(url);
  } catch (error) {
    res.send({ error: error});
    res.status(500);
  }
};
exports.deleteUrl = async (req, res) => {
  try {
    await myUrlModel.deleteOne({_id: req.params.id});
    res.sendStatus(204);
  } catch (error) {
    res.send({ error: error});
    res.status(500);
  }
}
