const matchAll = () => {

  const query = {body : {}};
  query.body.query = {
    match_all : {}
  };
  // Overwrite the default query body.sort
  // It has a body.sort score, which causes a sort problem in case of no query
  query.body.sort = {'log.visitStartTime' : {order : 'desc'}};
  return query;
};

module.exports = matchAll;