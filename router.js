const router = require ('express').Router();
const actions = require('./controllers');
const getAll = require('./elasticControllers/search');
const deletebyQuery = require('./elasticControllers/deleteByQuery');
const deleteDomain = require('./elasticControllers/deleteDomain');

// const sorted = require('./elasticControllers/sort');
// const filtered = require('./elasticControllers/dateFilter');

router.get('',getAll);
router.get('/:search',getAll);
router.post('',actions.insertUserVisit);
router.delete('/domain', deleteDomain);
router.delete('', deletebyQuery);
// router.get('/sorted/:order', filtered);
// router.get('/filter', filtered);

module.exports = router;