const esClient = require('../elasticDb');

const incomingPost = {
  "fullTitle": "Elasticsearch queries",
  "text": "This is how you make an elasticsearch query. It is not easy, but we will manage.",
  "userId": "45",
  "fullUrl": "http://www.stackoverflow.com",
  "timeSpent": "8888",
  "startTime": "12 march"
}

const addOne = async (req, res) => {
  const toInsert = {
    fullTitle: req.body.fullTitle,
    text: req.body.text,
    userId: req.body.userId,
    url: req.body.fullUrl.split('://')[1],
    log: [{
      startTime: req.body.startTime,
      timeSpent: req.body.timeSpent
    }]
  }
  try {
    const result = await esClient.search({
      index: 'history',
      body: {
        query: {
          bool: {
            must: [
              {match: {url : toInsert.url}},
              {match: {userId : toInsert.userId}},
            ]
          }
        }
      }
    })
    const returnedResult = result.hits.hits[0];
    const numberOfRecords = result.hits.total.value;
    if (!numberOfRecords) {
      const inserted = await esClient.index({
        index: 'history',
        body: toInsert
      })
      if(inserted.result!=='created') {
        throw new Error('Incorrect insertion');
      }
      console.log('successfully inserted')
      res.status(201);
      res.json(toInsert);
      res.end();
    }
    else {
      returnedResult._source.log = [...returnedResult._source.log, ...toInsert.log]
      await esClient.update({
        index: 'history',
        type: 'pageDataToUser',
        id: returnedResult._id,
        body: {
          doc: {
            log: returnedResult._source.log
          }
        },
      })
      console.log('successfully modified')
      res.status(202);
      res.json(toInsert);
      res.end();
    }

  } catch (error) {
    res.status(500);
    res.json({error});
    res.end();
  }
}

// addOne(incomingRecord);
module.exports = addOne;


