const router = require ('express').Router();
const actions = require('./controllers');
const getAll = require('./elasticControllers/search');

router.get('',getAll);
router.get('/:search',getAll);
router.post('',actions.insertUserVisit);

module.exports = router;