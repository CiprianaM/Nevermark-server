const esClient = require('../elasticDb');
const addOne = async (req, res) => {
  const toInsert = {
    pageTitle: req.body.pageTitle,
    pageText: req.body.pageText,
    userId: req.body.userId,
    url: req.body.fullUrl.split('://')[1],
    log: [{
      visitStartTime: req.body.visitStartTime,
      timeSpent: req.body.timeSpent
    }],
    visitTimeSpent: req.body.visitTimeSpent,
    protocol: req.body.fullUrl.split('://')[0]
  }
  try {
    const result = await esClient.search({
      index: 'history',
      body: {
        query: {
          bool: {
            must: [
              { term: { 'userId.keyword': { value: toInsert.userId } } },
              { term: { 'url.keyword': { value: toInsert.url } } }
            ]
          }
        }
      }
    })
    const returnedResult = result.body.hits.hits[0];
    const numberOfRecords = result.body.hits.total.value;
    if (!numberOfRecords) {
      const inserted = await esClient.index({
        index: 'history',
        body: {
          pageTitle: toInsert.pageTitle,
          pageText: toInsert.pageText,
          userId: toInsert.userId,
          url: toInsert.url,
          log: toInsert.log,
          totalVisits: 1,
          totalTimeSpent: Number(req.body.visitTimeSpent),
          protocol: toInsert.protocol
        }
      })
      if(inserted.body.result!=='created') {
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
        id: returnedResult._id,
        body: {
          doc: {
            log: returnedResult._source.log,
            totalVisits: returnedResult._source.totalVisits+1,
            totalTimeSpent: Number(returnedResult._source.totalTimeSpent)+Number(toInsert.log[0].timeSpent)
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
module.exports = addOne;