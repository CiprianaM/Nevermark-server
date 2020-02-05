// const mongoose = require('mongoose');
require('dotenv').config({ path : '../.env.dev' });

// const db = require('../db');
const theDb = require('../models');
// const checkObjProps = require('../utils/checkObjProps');
// const rmUrlCampaignParams = require('../utils/rmUrlCampaignParams');
const indexToElasticSearch = require('../elasticControllers/addOne');

const reindex = async (req,res) => {

  await theDb.url2User.find().count(function (err,count) {
    console.log('Number of docs: ',count);
  });

  // Mock req for postman
  // {
  //   "fullTitle" : "Elasticsearch queries",
  //   "text" : "This is how you make an elasticsearch query. It is not easy, but we will manage.",
  //   "userId" : "45",
  //   "fullUrl" : "http://www.stackoverflow.com/http://hello",
  //   "visitTimeSpent" : "8888",
  //   "visitStartTime" : "12 march"
  // }
  console.log('numberof reccords :');
  try {

    const records = await theDb.url2User.find();
    console.log('numberof reccords :');
    console.log(records.length);

    for (let i = 0;i < records.length - 1;i++) {

      const {pageTitle,pageText,userId,urlId,domainId} = records[i];

      const d = await theDb.domain.find({_id : domainId});
      const domain = d[0].domain;
      const u = await theDb.url.find({_id : urlId});
      const {url,fullUrl,protocol} = u[0];
      console.log(pageTitle);
      const l = await theDb.log.find({urlId,userId});
      const log = [];
      let visitTimeSpent = 0;
      for (let j = 0;j < l.length;j++) {
        const toPush = {
          visitStartTime : Number(l[j].visitStartTime),
          visitTimeSpent : Number(l[j].visitTimeSpent)
        };
        log.push(toPush);
        visitTimeSpent = Number(l[j].visitTimeSpent);
      }

      const toIndex = {
        pageTitle,
        pageText,
        userId,
        url,
        fullUrl,
        domain,
        log,
        visitTimeSpent,
        protocol
      };
      console.log(toIndex);
      const indexed = await indexToElasticSearch(toIndex,'history-reindexed');
    }
    console.log(':)');
    // const url2User = await theDb.url2User.findOneAndUpdate({userId,urlId},
    //   {
    //     userId,
    //     urlId,
    //     domainId,
    //     pageTitle,
    //     pageText
    //   },
    //   {new : true,
    //     upsert : true,
    //     useFindAndModify : false, // deprecation warning otherwise
    //     session
    //   }
    // );

    // const toIndex = {
    //   pageTitle,
    //   pageText,
    //   userId,
    //   url,
    //   fullUrl,
    //   domain,
    //   log : [{
    //     visitStartTime,
    //     visitTimeSpent
    //   }],
    //   visitTimeSpent,
    //   protocol
    // };

    // const indexed = await indexToElasticSearch(toIndex);
    // console.log('Mission is a success');

    // res.status(200).send(records.length);

  } catch (error) {
    // Our bad ...
    console.log('there is an error :' + error);
    // res.status(500).send({error : error.message});

  }
};

reindex();
