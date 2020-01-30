const router = require ('express').Router();
// const {getAllUrls, createNewUrl, deleteUrl} = require ('./controllers/url');

//ElasticSearch controllers
const addNewRecord = require('./elasticControllers/addOne');
const filterSearchReq = require('./elasticControllers/search')

//Mongoose controllers
const actions = require('./controllers');

router.get('', filterSearchReq);
router.post('', addNewRecord);
// router.delete('/urls/:id', deleteUrl);

module.exports = router;