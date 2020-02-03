const matchExact = (req) => {

  const query = {body : {}};
  query.body.query = {
    bool: {
      must: [
        { term: { 'userId.keyword': { value: req.body.userId } } },
        { term: { 'url.keyword': { value: req.body.url } } }
      ]
    }
  };
  query.body.sort = {'log.visitStartTime' : {order : 'desc'}};
  return query;
};

module.exports = matchExact;