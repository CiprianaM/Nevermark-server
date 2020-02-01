const matchAll = () => {

  const query = {body: {}};
    query.body.query = {
      match_all : {}
  }
  return query;
}

module.exports = matchAll;