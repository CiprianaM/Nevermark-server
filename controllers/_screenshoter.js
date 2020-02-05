// const mongoose = require('mongoose');
require('dotenv').config({ path : '../.env.dev' });
const ppt = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
var path = require('path');

// const db = require('../db');
const theDb = require('../models');
// const checkObjProps = require('../utils/checkObjProps');
// const rmUrlCampaignParams = require('../utils/rmUrlCampaignParams');
const indexToElasticSearch = require('../elasticControllers/addOne');

const reindex = async (req,res) => {

  try {

    const records = await theDb.url2User.find();
    console.log('numberof reccords :');
    console.log(records.length);

    const browser = await ppt.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    for (let i = 0;i < records.length;i++) {

      const {userId,urlId} = records[i];

      const u = await theDb.url.find({_id : urlId});
      const {fullUrl} = u[0];

      const fn = urlId;
      const ud = `../assets/sc/${userId}/`;
      const fp = `${ud}${fn}.webp`;

      if (!fs.existsSync(ud)) {
        fs.mkdirSync(ud);
      }
      if (fs.existsSync(fp)) {
        continue;
      }
      try {
        await page.goto(fullUrl,{ waitUntil : 'domcontentloaded' });
      } catch (e) {
        console.log('error : ' + e);
      }
      const im = await page.screenshot();
      const saved = await sharp(im)
        .resize(320,240)
        .webp({ lossless : false })
        .toFile(fp);
      console.log(saved);

    }
    console.log(':)');

  } catch (error) {
    // Our bad ...
    console.log('there is an error :' + error);
    // res.status(500).send({error : error.message});

  }
};

reindex();
