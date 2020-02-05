require('dotenv').config({ path : '../.env.dev' });
const insertUserVisit = require('./index').insertUserVisit;
const searchAll = require('../elasticControllers/searchAll');

class Res {
  status (param) {
    console.log('status set to:' + param);
    return this;
  }
  send (content) {
    console.log('res sent');
    return this;
  }
}

(async () =>{
  const req = {
    body : {
      dontIndexToElastic : true
    },
    params : {}
  };

  const res = new Res();
  /*
 { pageTitle: 'CiprianaM (Cipriana Milosanu)',
       pageText:
        'Nov\nDec\nJan\nMon\nWed\nFri\nLearn how we count contributions.\nLess      More\n2020\n2019\nContribution acti',
       url: 'github.com/ciprianam',
       log: [Array],
       totalVisits: 5,
       totalTimeSpent: 31457850,
       protocol: 'https',
       shortUrl: 'github.com/ciprianam',
       lastVisitTime: '12 hours ago',
       domain: 'github.com' },

        // {
  //   "pageTitle" : "Elasticsearch queries",
  //   "pageText" : "This is how you make an elasticsearch query. It is not easy, but we will manage.",
  //   "userId" : "45",
  //   "fullUrl" : "http://www.stackoverflow.com/http://hello",
  //   "visitTimeSpent" : "8888",
  //   "visitStartTime" : "12 march"
  // }

  */

  try {
    const response = await searchAll(req,res);
    const results = response.results;

    for (let i = 0;i < results.length;i++) {
      const result = results[i];
      const {userId,pageTitle,pageText,url,log,protocol} = result;

      if (url.includes('google') || url.includes('localhost') | url.includes('192.168.1')) {
        continue;
      }
      const fullUrl = protocol + '://' + url;
      const visitTimeSpent = visitStartTime = 0;
      const domain = url.split('/')[0];

      const visitData = {
        pageTitle,
        pageText,
        userId,
        domain,
        visitTimeSpent,
        fullUrl,
        visitStartTime
      };

      for (let j = 0;j < log.length;j++) {
        visitData.visitStartTime = log[j].visitStartTime;
        visitData.visitTimeSpent = log[j].visitTimeSpent;
        console.log(`{log[${j}]}:` + JSON.stringify(log[j]));
        await insertUserVisit({body : visitData},res);
      }

    }
  } catch (e) {
    console.log('error' + e);
  }
  // console.log('results size: ' + results.results.length);

// insertUserVisit(req);
})();