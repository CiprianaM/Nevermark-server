const esClient = require('../elasticDb');

const addOne = async (toInsert,index = 'history') => {

  try {
    const result = await esClient.search({
      index,
      body : {
        query : {
          bool : {
            must : [
              { term : { 'userId.keyword' : { value : toInsert.userId } } },
              { term : { 'url.keyword' : { value : toInsert.url } } }
            ]
          }
        }
      }
    });
    const numberOfRecords = result.body.hits.total.value;
    console.log(toInsert);

    if (!numberOfRecords) {

      const inserted = await esClient.index({
        index,
        body : {
          pageTitle : toInsert.pageTitle,
          pageText : toInsert.pageText,
          userId : toInsert.userId,
          url : toInsert.url,
          log : toInsert.log,
          totalVisits : 1,
          totalTimeSpent : Number(toInsert.visitTimeSpent),
          protocol : toInsert.protocol
        }
      });
      if (inserted.body.result !== 'created') {
        throw new Error('Incorrect insertion');
      }
      console.log('successfully inserted');
      return toInsert;

    } else {
      console.log('toInsert.log :' + JSON.stringify(toInsert.log));
      const returnedResult = result.body.hits.hits[0];
      console.log('result : ',returnedResult);

      console.log('numberOfRecords ',numberOfRecords);
      console.log('id = ',result.body.hits.hits[0]._id);
      returnedResult._source.log = [...returnedResult._source.log,...toInsert.log];
      console.log(returnedResult._source.log);

      const updated = await esClient.update({
        index,
        id : result.body.hits.hits[0]._id,
        body : {

          doc : {
            log : returnedResult._source.log,
            totalVisits : returnedResult._source.totalVisits + 1,
            totalTimeSpent : Number(returnedResult._source.totalTimeSpent) + Number(toInsert.log[0].visitTimeSpent)
          }
        },
      });

      console.log('updated :',updated);
      console.log('successfully modified');
      return toInsert;
    }

  } catch (error) {
    console.log('Error catched in addOne');
    throw new Error(error);
  }
};
module.exports = addOne;