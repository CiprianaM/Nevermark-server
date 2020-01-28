const client = require('../elasticDb');
async function run () {
client.indices.create({
  index: 'history'
}, (err, resp, status) => {
  if (err) {
    console.log(err)
  } else {
    console.log('create', resp)
    const mapping = client.indices.putMapping({
     index: 'history',
     properties: {
         body: {
           userId: {
            type: 'keyword',
            index: false
           },
           url: {
             type: 'keyword',
             index: false
           },
         }
       },
      }).catch(function(err) {
        console.error(err.stack || err, 'this is the errof for the mapping');
      });
      client.index({
        index: 'history',
        body: {
          url: String,
          userId: String,
          pageTitle: String,
          pageText: String,
          log: Array
        }
      },(err, resp, status) => {
        if (err) {
          console.log(err, 'this is the error for the index')
        } else {
          console.log('create', resp)
        }
      });
  }
})
}
run().catch(console.log)