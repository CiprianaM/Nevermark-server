require('dotenv').config({ path : '../.env.dev' });

// const index = 'history';
const buildQuery = (query,req) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const {NBRES_PER_FETCH} = process.env || 20;
  const defaultQuery = {
    index : 'history',
    body : {
      size : NBRES_PER_FETCH,
      from : pageNum * NBRES_PER_FETCH,
      query : {
        match_all : {}
      },
      sort : {
        score : 'desc',
        'log.visitStartTime' : {order : 'desc'}
      }
    }
  };

  if (typeof query === 'object') {
    return Object.assign(defaultQuery,query);
  }
};

module.exports = buildQuery;