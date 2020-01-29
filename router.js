const router = require ('express').Router();
const {getAllUrls, createNewUrl, deleteUrl} = require ('./controllers/url');
const addNewRecord = require('./elasticControllers/addOne');
const retrieveMultipleTextSearch = require('./elasticControllers/searchMultipleText');
const retrieveMultipleTitleSearch = require('./elasticControllers/searchMultipleTitle');
const getAll = require('./elasticControllers/searchAll')

router.get('', retrieveMultipleTextSearch);
router.get('/all', getAll);
router.get('/title', retrieveMultipleTitleSearch);
router.post('', addNewRecord);
router.delete('/urls/:id', deleteUrl);

module.exports = router;