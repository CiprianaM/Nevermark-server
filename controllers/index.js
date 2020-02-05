require('dotenv').config({ path : '../.env.dev' });
const theDb = require('../models');
const mongoose = require('mongoose');
const checkObjProps = require('../utils/checkObjProps');
const rmUrlCampaignParams = require('../utils/rmUrlCampaignParams');
const indexToElasticSearch = require('../elasticControllers/addOne');

exports.insertUserVisit = async (req,res) => {

  // Mock req for postman
  // {
  //   "pageTitle" : "Elasticsearch queries",
  //   "pageText" : "This is how you make an elasticsearch query. It is not easy, but we will manage.",
  //   "userId" : "45",
  //   "fullUrl" : "http://www.stackoverflow.com/http://hello",
  //   "visitTimeSpent" : "8888",
  //   "visitStartTime" : "12 march"
  // }

  // req validation
  try {
    if (!req.body) {
      throw Error('Missing request body');
    }
    if (req.body.stop) {
      res.json('i have stopped posting')
      return;
    }

    const checkRules = [
      {prop : 'pageTitle',type : 'string',required : true},
      {prop : 'pageText',type : 'string'},
      {prop : 'userId',type : 'integer',required : true},
      {prop : 'fullUrl',type : 'string',required : true},
      {prop : 'visitTimeSpent',type : 'integer',required : true},
      {prop : 'visitStartTime',type : 'integer',required : true}
    ];

    const validated = checkObjProps(req.body,checkRules);
    if (validated.error) {
      console.log('validation error :' + validated.error);
      res.status(400).send(JSON.stringify(validated,null,2));
      return;
    }

  } catch (e) {
    console.log('error thrown :' + e.message);
    // Bad request from the client
    res.status(400).send(e.message);
    return;
  }

  // req treatment
  const {pageText,pageTitle,userId,visitTimeSpent,visitStartTime} = req.body; // just take what we need, in case

  const fullUrl = rmUrlCampaignParams(req.body.fullUrl);
  let splitUrl = fullUrl.split('://');
  const protocol = splitUrl[0];
  const url = fullUrl.replace(`${protocol}://`,''); // replace the protocol just once. in case other occurences

  const domain = url
    .split('/')[0]
    .split('?')[0];

  // req posting
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let domainId,urlFromDb,urlId;
    // Does the domain from this url exists ?
    // Yes, get the id.
    // No ? insert the id

    let domainfromDb = await theDb.domain.findOne({domain});
    if (!domainfromDb) {
      console.log('No domain existing');
      domainfromDb = await new theDb.domain({domain}).save({ session });

    }
    domainId = domainfromDb._id;
    if (!domainId) {
      throw new Error('Impossible to fetch domainId');
    }

    // const domainId = domainFromDb[0]._id;
    if (!domainId) throw new Error(`Failed to save domain ${domain}`);

    // does this urls exists ?
    // yes ? get the id
    // no ? insert it and get the id
    urlFromDb = await theDb.url.findOne({fullUrl});
    if (!urlFromDb) {
      console.log('No url existing. inserting it');
      const urlToInsert = await new theDb.url({url,fullUrl,domainId,protocol});
      urlFromDb = await urlToInsert.save({ session });
    }

    urlId = urlFromDb._id;
    if (!urlId) throw new Error(`Failed to save url ${url}`);

    // Insert into log
    const logToInsert = await new theDb.log({userId,domainId,urlId,visitStartTime,visitTimeSpent});
    const logFromDb = await logToInsert.save({ session });
    if (!logFromDb) {
      throw new Error('Impossible to insert log in db');
    }

    // Upsert the urltoUser
    const url2User = await theDb.url2User.findOneAndUpdate({userId,urlId},
      {
        userId,
        urlId,
        domainId,
        pageTitle,
        pageText
      },
      {new : true,
        upsert : true,
        useFindAndModify : false, // deprecation warning otherwise
        session
      }
    );

    if (!url2User) {
      throw new Error('Impossible to upsert url2user in db');
    }

    const toIndex = {
      pageTitle,
      pageText,
      userId,
      url,
      fullUrl,
      domain,
      log : [{
        visitStartTime,
        visitTimeSpent
      }],
      visitTimeSpent,
      protocol
    };
    if (!req.body.dontIndexToElastic) {
      const indexed = await indexToElasticSearch(toIndex,process.env.ELASTIC_INDEX);
      res.status(201).send(indexed);
    }
    console.log('Mission is a success');

    // TODO : ElasticSearch Index From here
    await session.commitTransaction();
  } catch (error) {
    // Our bad ...
    console.log('Transaction aborted ' + error);
    await session.abortTransaction();
    res.status(500).send({error : error.message});

  } finally {
    session.endSession();
  }
};

