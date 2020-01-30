const router = require ('express').Router();
const actions = require('./controllers');
const retrieveMultipleTextSearch = require('./elasticControllers/searchMultipleText');
const retrieveMultipleTitleSearch = require('./elasticControllers/searchMultipleTitle');
const getAll = require('./elasticControllers/searchAll');

router.get('',retrieveMultipleTextSearch);
router.get('/all',getAll);
router.get('/title',retrieveMultipleTitleSearch);
router.post('',actions.insertUserVisit);

module.exports = router;