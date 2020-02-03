const matchFuzzy = (req) => {

  const query = {body: {}};
  query.body.query = {
    multi_match : {
      type: 'best_fields',
      query : req.params.search,
      fields : [ 'pageTitle^3','pageText'],
      fields: [
        'pageTitle',
        'pageTitle._2gram',
        'pageTitle._3gram',
        'pageText',
        'pageText._2gram',
        'pageText._3gram'
      ],
      fuzziness: '2'
    },
  };
  return query;
}

module.exports = matchFuzzy;