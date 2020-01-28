const esClient = require('../elasticDb');

esClient.indices.create({
  index: 'history'
}, (err, resp, status) => {
  if (err) {
    console.log(err)
  } else {
    console.log('create', resp)
  }
})
esClient.index({
  index: 'history',
  type: 'pageDataToUser',
  body: {
    url: String,
    pageTitle: String,
    pageText: String,
    userId: String,
    log: Array
  }
},(err, resp, status) => {
  if (err) {
    console.log(err)
  } else {
    console.log('create', resp)
  }
});



